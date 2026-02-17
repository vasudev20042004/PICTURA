import urllib.request
import re

url = "https://www.youtube.com/@PicturaCreations"
try:
    with urllib.request.urlopen(url) as response:
        html = response.read().decode('utf-8')
        # Look for channelId in meta tags or JSON
        match = re.search(r'"channelId":"(UC[\w-]+)"', html)
        if match:
            print(f"FOUND_CHANNEL_ID: {match.group(1)}")
        else:
            # Fallback for meta tag
            match_meta = re.search(r'<meta itemprop="channelId" content="(UC[\w-]+)">', html)
            if match_meta:
                print(f"FOUND_CHANNEL_ID: {match_meta.group(1)}")
            else:
                print("Channel ID not found in source.")
except Exception as e:
    print(f"Error: {e}")
