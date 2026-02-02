# WHAASCO Website Setup Guide

## Development Environment

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Email Configuration

The contact form requires an email service to send form submissions. Choose one of the following options:

### Option 1: Resend (Recommended for simplicity)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=info@whaasco.org
FROM_EMAIL=noreply@whaasco.org
```

4. Install Resend package:
```bash
npm install resend
```

5. Update `app/api/contact/route.ts` to use Resend (uncomment the Resend code)

### Option 2: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Add to `.env.local`:
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
CONTACT_EMAIL=info@whaasco.org
FROM_EMAIL=noreply@whaasco.org
```

4. Install SendGrid package:
```bash
npm install @sendgrid/mail
```

### Option 3: AWS SES

1. Set up AWS SES
2. Add credentials to `.env.local`:
```
AWS_SES_ACCESS_KEY=your_access_key
AWS_SES_SECRET_KEY=your_secret_key
AWS_SES_REGION=us-east-1
CONTACT_EMAIL=info@whaasco.org
FROM_EMAIL=noreply@whaasco.org
```

## Donation Integration

To enable secure donations:

1. Set up a donation platform:
   - PayPal Donate Button
   - Stripe
   - Givebutter
   - Network for Good
   - Or any other secure donation platform

2. Add your donation link to `.env.local`:
```
NEXT_PUBLIC_DONATION_LINK=https://your-donation-platform.com/donate
```

3. The donation page will automatically redirect to your secure platform

## Content Management

### Board Members
- Edit `app/board/page.tsx` to add/update board member information
- Add photos to `public/images/board/` directory
- Update the `boardMembers` array with actual member data

### Gallery & Events
- Edit `app/gallery/page.tsx` to add/update events and gallery images
- Add event photos to `public/images/gallery/` directory
- Update the `events` and `galleryImages` arrays with actual content

### About Page
- Edit `app/about/page.tsx` to add organization history and details

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## Support

For questions or issues, contact the development team.
