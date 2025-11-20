# API Integration Setup Guide

This guide explains how to connect the React frontend to your Laravel backend.

## Environment Configuration

1. Create a `.env` file in the root directory of your React project (if it doesn't exist)
2. Add the following environment variable:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Note:** Replace `http://localhost:8000/api` with your actual Laravel backend URL.

- For local development: `http://localhost:8000/api` (default Laravel port)
- For production: `https://your-domain.com/api`

## Laravel Backend Setup

Your `ContactController` is already set up! However, I noticed one small discrepancy:

### Current Backend Validation
Your backend currently validates:
- `name` (required)
- `email` (required)  
- `message` (required, min:10, max:5000)

### Frontend Sends
The frontend sends:
- `name` (required)
- `email` (required)
- `phone` (optional)
- `message` (required)

### Recommendation: Add Phone Field (Optional)

Since the frontend sends a phone field and you want it to be optional, update your `ContactController::submit` method:

**1. Add phone to validation (as optional):**
```php
$validated = $request->validate([
    'name' => ['required', 'string', 'max:255'],
    'email' => ['required', 'email', 'max:255'],
    'phone' => ['nullable', 'string', 'max:20'], // Add this - phone is optional
    'message' => ['required', 'string', 'min:10', 'max:5000'],
]);
```

**2. Add phone to ContactMessage::create:**
```php
$message = ContactMessage::create([
    'name' => $validated['name'],
    'email' => $validated['email'],
    'phone' => $validated['phone'] ?? null, // Add this line
    'message' => $validated['message'],
    'ip_address' => $request->ip(),
    'is_read' => false,
]);
```

**3. If your database table doesn't have a `phone` column, create a migration:**
```bash
php artisan make:migration add_phone_to_contact_messages_table
```

Then in the migration file:
```php
public function up()
{
    Schema::table('contact_messages', function (Blueprint $table) {
        $table->string('phone', 20)->nullable()->after('email');
    });
}

public function down()
{
    Schema::table('contact_messages', function (Blueprint $table) {
        $table->dropColumn('phone');
    });
}
```

### Current Status
Right now, your backend ignores the `phone` field since it's not in the validation rules. Adding it as `nullable` will allow the frontend to send it and store it when provided.

### Step 4: Test the Route

You can test if the route is working by running:

```bash
php artisan route:list | grep contact
```

You should see the route listed.

### Contact Form Endpoint Details

**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here"
}
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Expected Response (Validation Error - 422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "name": ["The name field is required."]
  }
}
```

## CORS Configuration

Make sure your Laravel backend has CORS configured to allow requests from your frontend. In your Laravel backend, check `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
    // Add your production domain
],
```

## Testing the Connection

1. Start your Laravel backend server:
   ```bash
   php artisan serve
   ```

2. Start your React frontend:
   ```bash
   npm run dev
   ```

3. Navigate to the Contact page or Service Detail page and submit the form
4. Check the browser console and network tab for any errors

## API Service Files

- `src/lib/api/config.js` - Axios configuration and base setup
- `src/lib/api/contactService.js` - Contact form API service

## Contact Forms Integrated

The following forms are now connected to the Laravel backend:
1. **Contact Page** (`/contact`) - Main contact form
2. **Service Detail Page** (`/services/:serviceId`) - Query form in sidebar

Both forms use the same API endpoint and provide:
- Loading states with spinner
- Success/error alerts
- Form reset on successful submission
- Error handling for network and validation errors

## Adding More API Endpoints

To add more API endpoints, create new service files in `src/lib/api/` following the same pattern as `contactService.js`:

```javascript
import apiClient from "./config";

export const yourNewService = async (data) => {
  try {
    const response = await apiClient.post("/your-endpoint", data);
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Success!",
    };
  } catch (error) {
    // Error handling
    return {
      success: false,
      error: error.response?.data,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};
```

