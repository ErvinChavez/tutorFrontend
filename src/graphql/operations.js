import { gql } from '@apollo/client';

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

export const SUBMIT_TUTORING_REQUEST = gql`
  mutation SubmitTutoringRequest($input: SubmitTutoringRequestInput!) {
    submitTutoringRequest(input: $input) {
      _id
      status
      createdAt
    }
  }
`;

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