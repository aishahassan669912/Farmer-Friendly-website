import requests
import json

BASE_URL = 'http://localhost:5000/api'

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f'{BASE_URL}/health')
        print(f"Health Check: {response.status_code} - {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health Check Error: {e}")
        return False

def test_admin_login():
    """Test admin login"""
    try:
        data = {
            'email': 'agriaisha466@gmail.com',
            'password': 'aisha123'
        }
        response = requests.post(f'{BASE_URL}/auth/login', json=data)
        print(f"Admin Login: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Login successful for: {result['user']['name']} ({result['user']['role']})")
            return result['token']
        else:
            print(f"Login failed: {response.json()}")
            return None
    except Exception as e:
        print(f"Admin Login Error: {e}")
        return None

def test_farmer_registration():
    """Test farmer registration"""
    try:
        data = {
            'name': 'Test Farmer',
            'email': 'testfarmer@example.com',
            'password': 'password123',
            'role': 'farmer',
            'phone': '+1234567890',
            'location': 'Test Location',
            'farmSize': 50.0,
            'crops': 'Corn, Wheat',
            'droughtImpact': 'medium'
        }
        response = requests.post(f'{BASE_URL}/auth/register', json=data)
        print(f"Farmer Registration: {response.status_code}")
        if response.status_code == 201:
            result = response.json()
            print(f"Registration successful for: {result['user']['name']}")
            return result['token']
        else:
            print(f"Registration failed: {response.json()}")
            return None
    except Exception as e:
        print(f"Farmer Registration Error: {e}")
        return None

def test_ngo_registration():
    """Test NGO registration"""
    try:
        data = {
            'name': 'Test NGO Contact',
            'email': 'testngo@example.com',
            'password': 'password123',
            'role': 'ngo',
            'phone': '+1234567890',
            'location': 'Test NGO Location',
            'organizationName': 'Test NGO',
            'organizationType': 'ngo',
            'focusAreas': 'Drought relief, Water conservation',
            'description': 'Test NGO description'
        }
        response = requests.post(f'{BASE_URL}/auth/register', json=data)
        print(f"NGO Registration: {response.status_code}")
        if response.status_code == 201:
            result = response.json()
            print(f"Registration successful for: {result['user']['name']}")
            return result['token']
        else:
            print(f"Registration failed: {response.json()}")
            return None
    except Exception as e:
        print(f"NGO Registration Error: {e}")
        return None

def test_admin_endpoints(token):
    """Test admin-specific endpoints"""
    if not token:
        print("No token provided for admin tests")
        return
    
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        # Test getting all users
        response = requests.get(f'{BASE_URL}/admin/users', headers=headers)
        print(f"Get All Users: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Found {len(result['users'])} users")
        
        # Test getting platform stats
        response = requests.get(f'{BASE_URL}/admin/stats', headers=headers)
        print(f"Get Platform Stats: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Platform Stats: {result['stats']}")
            
    except Exception as e:
        print(f"Admin Endpoints Error: {e}")

def test_support_requests(token):
    """Test support request endpoints"""
    if not token:
        print("No token provided for support request tests")
        return
    
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        # Test getting support requests
        response = requests.get(f'{BASE_URL}/support-requests', headers=headers)
        print(f"Get Support Requests: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Found {len(result['requests'])} support requests")
            
    except Exception as e:
        print(f"Support Requests Error: {e}")

def main():
    print("=== AgriSupport API Test ===\n")
    
    # Test health check
    if not test_health_check():
        print("Health check failed. Make sure the server is running.")
        return
    
    print("\n--- Testing Authentication ---")
    
    # Test admin login
    admin_token = test_admin_login()
    
    # Test farmer registration
    farmer_token = test_farmer_registration()
    
    # Test NGO registration
    ngo_token = test_ngo_registration()
    
    print("\n--- Testing Admin Endpoints ---")
    test_admin_endpoints(admin_token)
    
    print("\n--- Testing Support Requests ---")
    test_support_requests(admin_token)
    
    print("\n=== Test Complete ===")

if __name__ == '__main__':
    main()
