# AAU Startups Portal - Apply Page Integration

## Overview

The Apply page is a comprehensive application form that collects detailed information about startup applications through a 7-step process. Currently using mock data storage - you'll need to integrate with your preferred database solution.

## Current Implementation

The application currently uses **in-memory mock storage**. This means:

- ✅ All form functionality works
- ✅ Form validation is complete
- ✅ Multi-step navigation works
- ⚠️ Data is NOT persisted (resets on server restart)
- ⚠️ You need to integrate a real database

## Database Integration Required

To persist application data, you'll need to:

### Option 1: Use a Database Service
- PostgreSQL, MySQL, MongoDB, etc.
- Update API routes in `/app/api/applications/` to use your database
- Replace mock data stores with actual database queries

### Option 2: Use an ORM
- Prisma, TypeORM, Drizzle, etc.
- Define your schema
- Update API routes to use the ORM

### Option 3: Use a Backend Service
- Firebase, AWS Amplify, Appwrite, etc.
- Follow their documentation for Next.js integration

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

## Security Features (To Implement)

When integrating with a real database, implement:

- **Authentication Required**: Users must be logged in to submit applications
- **User Profile Validation**: Ensure user exists before accepting applications
- **Duplicate Prevention**: Prevent multiple pending applications per user
- **Data Access Control**: Users can only access their own applications
- **Admin Access**: Admins can view and manage all applications

## File Uploads (To Implement)

The current implementation accepts file data but doesn't store them. To add file uploads:

1. Choose a file storage solution (AWS S3, Cloudinary, etc.)
2. Update the API to handle file uploads
3. Store file metadata in the applications table
4. Implement file access policies

## Admin Features (To Implement)

Future admin capabilities:

- View all applications
- Update application status
- Add review notes and scores
- Manage the application review process

## Testing

1. Ensure user authentication works (currently uses localStorage)
2. Test the complete form submission flow
3. Verify form validation and error handling
4. Test all 7 steps of the application process

## Next Steps

1. **Database Integration**: Replace mock storage with real database
2. **File Upload Implementation**: Add file storage integration
3. **Email Notifications**: Send confirmation emails on submission
4. **Admin Dashboard**: Create interface for reviewing applications
5. **Application Status Tracking**: Allow users to track their application progress
6. **Export Functionality**: Add ability to export applications to CSV/PDF
