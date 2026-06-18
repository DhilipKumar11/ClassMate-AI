import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app

# This file is used as the Vercel serverless function entrypoint.

