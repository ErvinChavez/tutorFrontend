import { gql } from '@apollo/client';

/**
 * Public query: approved testimonials for the reviews section.
 * Matches the backend `approvedTestimonials` field (no auth required).
 */
export const APPROVED_TESTIMONIALS = gql`
  query ApprovedTestimonials {
    approvedTestimonials {
      _id
      parentAuthor
      message
      rating
      createdAt
    }
  }
`;

/**
 * Public mutation: a parent submits a tutoring request.
 * Mirrors SubmitTutoringRequestInput on the backend.
 */
export const SUBMIT_TUTORING_REQUEST = gql`
  mutation SubmitTutoringRequest($input: SubmitTutoringRequestInput!) {
    submitTutoringRequest(input: $input) {
      _id
      status
      createdAt
    }
  }
`;

/**
 * Public mutation: a parent leaves feedback.
 * Returns the routing hint (invitePublicReview / publicReviewUrl /
 * followUpMessage) so the UI can react to the sentiment appropriately.
 */
export const SUBMIT_TESTIMONIAL = gql`
  mutation SubmitTestimonial($input: SubmitTestimonialInput!) {
    submitTestimonial(input: $input) {
      invitePublicReview
      publicReviewUrl
      followUpMessage
      testimonial {
        _id
        rating
      }
    }
  }
`;