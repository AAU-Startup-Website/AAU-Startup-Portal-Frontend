# 🚨 DATABASE SETUP REQUIRED

## Critical Setup Step

**The Apply page will NOT work until you complete this step:**

### 1. Create Database Tables

Go to your **Supabase Dashboard** → **SQL Editor** and run the entire contents of:

```
supabase-applications-schema.sql
```

This creates:

- `users` table for user profiles
- `applications` table for startup applications
- Proper security policies and indexes

### 2. Verify Setup

After running the SQL, the Apply page should work. If you still get errors, check:

- ✅ Environment variables are set in `.env`
- ✅ SQL schema ran without errors
- ✅ User is logged in when submitting
- ✅ All required form fields are filled

### 3. Test the Application

1. Register/Login as a user
2. Go to `/apply`
3. Fill out the 7-step form
4. Submit - should work now!

---

# AAU Startups Portal - Apply Page Integration

## Overview

The Apply page is now fully functional with Supabase backend integration. This comprehensive application form collects detailed information about startup applications through a 7-step process.

## Database Setup

### 1. Run the Schema

Execute the SQL schema in your Supabase dashboard:

```sql
-- Copy and paste the contents of supabase-applications-schema.sql
-- into your Supabase SQL editor and run it
```

This will create:

- `users` table for user profiles
- `applications` table for startup applications
- Proper indexes and Row Level Security (RLS) policies

### 2. Environment Variables

Ensure your `.env` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Application Flow

### Form Steps

1. **Problem Definition** - Problem statement, target audience, scale, urgency
2. **Solution & Product** - Solution description, value proposition, product type, development stage
3. **Market Analysis** - Market size, target market, competitors, customer acquisition, revenue model
4. **Team & Expertise** - Team vision, team members (with detailed profiles), skill gaps
5. **Business Details** - Company name, industry sectors, business stage, business model, funding needs
6. **Documents** - File uploads, additional information
7. **Review & Submit** - Form review and final submission with agreements

### Data Structure

The application data includes:

```typescript
{
  // User identification
  userId: string

  // Problem Definition
  problemStatement: string
  targetAudience: string
  problemSize: 'local' | 'national' | 'regional' | 'continental' | 'global'
  urgency: 'critical' | 'high' | 'medium' | 'low'
  currentSolutions?: string

  // Solution & Product
  solutionDescription: string
  valueProposition: string
  productType: 'web_app' | 'mobile_app' | 'saas' | 'hardware' | 'ai_ml' | 'blockchain' | 'iot' | 'other'
  developmentStage: 'idea' | 'prototype' | 'mvp' | 'beta' | 'launched' | 'scaling'

  // Market Analysis
  marketSize: string
  targetMarket: string
  competitors: string
  customerAcquisition: string
  revenueModel: 'subscription' | 'transaction_fees' | 'advertising' | 'licensing' | 'marketplace' | 'other'

  // Team & Expertise
  teamVision: string
  teamMembers: Array<{
    name: string
    role: string
    email: string
    experience: string
    skills: string[]
    linkedIn?: string
    commitment: 'full-time' | 'part-time' | 'advisor' | 'consultant'
  }>
  teamGaps?: string

  // Business Details
  companyName: string
  sectors: string[]
  businessStage: 'ideation' | 'validation' | 'mvp' | 'early-traction' | 'growth' | 'expansion'
  businessModel: string
  fundingNeeds?: string
  traction?: string
  challenges?: string
  timeline?: string

  // Additional
  additionalInfo?: string
  agreements: {
    accuracy: boolean
    terms: boolean
    privacy: boolean
    communication: boolean
  }
}
```

## API Endpoints

### POST /api/applications

Submits a new application.

**Request Body:**

```json
{
  "userId": "uuid",
  ...formData
}
```

**Response:**

```json
{
  "data": { ...application },
  "message": "Application submitted successfully"
}
```

### GET /api/applications

Retrieves applications (filtered by user or admin).

**Query Parameters:**

- `user_id`: Filter by user ID
- `status`: Filter by status
- `limit`: Number of results (default: 20)
- `from`: Offset for pagination

## Security Features

- **Authentication Required**: Users must be logged in to submit applications
- **User Profile Validation**: Ensures user exists in users table
- **Duplicate Prevention**: Prevents multiple pending applications per user
- **Row Level Security**: Users can only access their own applications
- **Admin Access**: Admins can view and manage all applications

## File Uploads (Future Enhancement)

The current implementation accepts file data but doesn't store them. To add file uploads:

1. Create a Supabase Storage bucket: `application-documents`
2. Update the API to handle file uploads
3. Store file metadata in the applications table
4. Implement file access policies

## Admin Features

Admins can:

- View all applications
- Update application status
- Add review notes and scores
- Manage the application review process

## Testing

1. Ensure user authentication works
2. Test the complete form submission flow
3. Verify data is stored correctly in Supabase
4. Test admin access to applications
5. Check form validation and error handling

## Next Steps

1. **File Upload Implementation**: Add Supabase Storage integration
2. **Email Notifications**: Send confirmation emails on submission
3. **Admin Dashboard**: Create interface for reviewing applications
4. **Application Status Tracking**: Allow users to track their application progress
5. **Export Functionality**: Add ability to export applications to CSV/PDF
