import requests

API_KEY = ""  
URL = "https://api.data.gov/ed/collegescorecard/v1/schools"

# Ask user whether to search by degree level or by name
choice = input("Search by degree level or school name? (degree/name): ").strip().lower()

params = {
    "api_key": API_KEY,
    "fields": (
        "id,school.name,school.city,school.state,school.zip,"
        "school.ownership,school.degrees_awarded.highest,"
        "2019.student.size,2019.admissions.admission_rate.overall,"
        "2019.completion.completion_rate_4yr_150nt"
    ),
    "per_page": 5,  
    "page": 0
}

if choice == "degree":
    degree_filter = input("Which degree level? (bachelors / masters / phd): ").strip().lower()
    degree_map = {"bachelors": 3, "masters": 4, "phd": 5}

    if degree_filter not in degree_map:
        print("Invalid choice. Please enter 'bachelors', 'masters', or 'phd'.")
        exit()

    params["school.degrees_awarded.highest"] = degree_map[degree_filter]

elif choice == "name":
    keyword = input("Enter part of the school name: ").strip()
    params["school.name__icontains"] = keyword

else:
    print("Invalid choice. Please enter 'degree' or 'name'.")
    exit()

response = requests.get(URL, params=params)
data = response.json()

degree_labels = {3: "Bachelor’s", 4: "Master’s", 5: "Doctoral/PhD"}
ownership_map = {1: "Public", 2: "Private Nonprofit", 3: "Private For-Profit"}

if "results" not in data or not data["results"]:
    print("No schools found for your search.")
else:
    for school in data["results"]:
        print("\n" + "*"*50)
        print(f"Name: {school['school.name']}")
        print(f"City: {school['school.city']}")
        print(f"State: {school['school.state']}")
        print(f"Zip: {school['school.zip']}")
        print(f"Type: {ownership_map.get(school['school.ownership'], 'Unknown')}")
        print(f"Highest Degree Offered: {degree_labels.get(school['school.degrees_awarded.highest'], 'Unknown')}")
        print(f"Size (Enrollment): {school['2019.student.size']}")
        print(f"Acceptance Rate: {school.get('2019.admissions.admission_rate.overall')}")
        print(f"Graduation Rate: {school.get('2019.completion.completion_rate_4yr_150nt')}")
        print("*"*50)
