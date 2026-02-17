import urllib.request
import re

url = "https://www.youtube.com/@PicturaCreations"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
        # Look for "externalId":"UC..."
        match = re.search(r'"externalId":"(UC[\w-]+)"', content)
        if match:
            print(f"FOUND: {match.group(1)}")
        else:
            # Look for channel_id meta tag
            match_meta = re.search(r'<meta itemprop="channelId" content="(UC[\w-]+)">', content)
            if match_meta:
                print(f"FOUND: {match_meta.group(1)}")
            else:
                print("Not found")
except Exception as e:
    print(f"Error: {e}")
