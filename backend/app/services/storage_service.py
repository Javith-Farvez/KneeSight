import os
import aiofiles
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
SUPABASE_BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET", "knee-imaging")

# Local storage fallback directory
LOCAL_STORAGE_DIR = Path("./backend/storage")
LOCAL_STORAGE_DIR.mkdir(parents=True, exist_ok=True)


class StorageService:
    def __init__(self):
        self.supabase_client = None
        if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.strip() and SUPABASE_KEY.strip():
            try:
                from supabase import create_client
                self.supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
            except Exception as e:
                print(f"[StorageService] Supabase client initialization error: {e}. Falling back to local storage.")
                self.supabase_client = None

    async def upload_knee_image(self, case_id: str, filename: str, content_bytes: bytes, content_type: str = "image/png") -> dict:
        """
        Uploads knee image following structure: cases/{case_id}/images/{filename}
        Uses Supabase Storage if configured; otherwise persists locally.
        """
        storage_path = f"cases/{case_id}/images/{filename}"

        if self.supabase_client:
            try:
                # Upload to Supabase Storage Bucket
                self.supabase_client.storage.from_(SUPABASE_BUCKET).upload(
                    path=storage_path,
                    file=content_bytes,
                    file_options={"content-type": content_type, "upsert": "true"}
                )
                public_url_resp = self.supabase_client.storage.from_(SUPABASE_BUCKET).get_public_url(storage_path)
                file_url = public_url_resp if isinstance(public_url_resp, str) else public_url_resp.get("publicURL", "")

                return {
                    "storage_provider": "supabase",
                    "storage_path": storage_path,
                    "file_url": file_url,
                    "size_bytes": len(content_bytes)
                }
            except Exception as err:
                print(f"[StorageService] Supabase upload failed ({err}). Falling back to local disk.")

        # Local storage fallback
        dest_dir = LOCAL_STORAGE_DIR / f"cases/{case_id}/images"
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_path = dest_dir / filename

        async with aiofiles.open(dest_path, "wb") as f:
            await f.write(content_bytes)

        return {
            "storage_provider": "local_disk",
            "storage_path": storage_path,
            "file_url": f"/storage/{storage_path}",
            "size_bytes": len(content_bytes)
        }


storage_service = StorageService()
