import urllib.request
import re

# Try fetching user feed instead of channel feed to test
url = "https://www.youtube.com/@PicturaCreations"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
        # Look for "channelId":"UC..."
        match = re.findall(r'"channelId":"(UC[\w-]+)"', content)
        if match:
            print(f"FOUND Channel IDs: {set(match)}")
        else:
            print("No channelId found.")
            
        # Look for "externalId":"UC..."
        match_ext = re.findall(r'"externalId":"(UC[\w-]+)"', content)
        if match_ext:
            print(f"FOUND External IDs: {set(match_ext)}")
        
except Exception as e:
    print(f"Error: {e}")
