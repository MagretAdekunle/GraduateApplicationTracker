import requests
from bs4 import BeautifulSoup
from ddgs import DDGS

def get_admissions_page(school_name):
    """Search DuckDuckGo for the grad admissions page of a school."""
    query = f"{school_name} graduate admissions apply site:.edu"
    with DDGS() as ddgs:
        results = list(ddgs.text(query, max_results=10))
        candidates = []
        for r in results:
            url = r.get("href", "")
            if url and ".edu" in url.lower():
                # Only consider graduate-related pages
                if any(word in url.lower() for word in ["grad", "graduate", "gradschool", "admission", "apply"]):
                    return url
                candidates.append(url)
        # fallback: return first .edu candidate
        return candidates[0] if candidates else None
    return None

def scrape_admissions_page(url):
    """Scrape deadlines, fees, requirements from admissions page text."""
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    
    if response.status_code != 200:
        return f"Failed to fetch {url}"
    
    soup = BeautifulSoup(response.text, "html.parser")
    text = soup.get_text(separator=" ", strip=True).lower()
    
    info = {}
    keywords = {
        "deadline": "deadline",
        "fee": "application fee",
        "requirements": "requirement",
        "transcript": "transcript",
        "recommendation": "recommendation",
        "gre": "gre",
        "gmat": "gmat",
        "ielts": "ielts",
        "toefl": "toefl",
        "essay": "statement of purpose"
    }
    
    for key, word in keywords.items():
        if word in text:
            idx = text.find(word)
            snippet = text[max(0, idx-80): idx+200]
            info[key] = snippet
    
    return info if info else "No key info found, check manually."

    
def main():
    school = input("Enter the school name: ")
    admissions_url = get_admissions_page(school)
    
    if not admissions_url:
        print("Could not find admissions page.")
        return
    
    print(f"Found admissions page: {admissions_url}")
    
    info = scrape_admissions_page(admissions_url)
    print("\n Extracted Info:")
    if isinstance(info, dict):
        for k, v in info.items():
            print(f"- {k.capitalize()}: {v}")
    else:
        print(info)

if __name__ == "__main__":
    main()