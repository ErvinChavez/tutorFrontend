import { gql } from '@apollo/client';

export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      admin {
        _id
        name
        email
        role
      }
    }
  }
`;

export const GET_REQUESTS = gql`
  query Requests {
    requests {
      _id
      parentName
      email
      phone
      studentName
      subject
      gradeLevel
      message
      status
      createdAt
    }
  }
`;

export const UPDATE_REQUEST_STATUS = gql`
  mutation UpdateRequestStatus($id: ID!, $status: RequestStatus!) {
    updateRequestStatus(id: $id, status: $status) {
      _id
      status
    }
  }
`;

export const CONVERT_REQUEST_TO_STUDENT = gql`
  mutation ConvertRequestToStudent($requestId: ID!) {
    convertRequestToStudent(requestId: $requestId) {
      _id
      name
    }
  }
`;

export const GET_STUDENTS = gql`
  query Students {
    students {
      _id
      name
      gradeLevel
      subjects
      parentName
      parentEmail
      parentPhone
      isActive
      createdAt
    }
  }
`;

const SESSION_FIELDS = gql`
  fragment SessionFields on Session {
    _id
    date
    durationMinutes
    subject
    notes
    paymentStatus
    student {
      _id
      name
      gradeLevel
    }
  }
`;

export const GET_SESSIONS = gql`
  query Sessions {
    sessions {
      ...SessionFields
    }
  }
  ${SESSION_FIELDS}
`;

export const GET_UNPAID_SESSIONS = gql`
  query UnpaidSessions {
    unpaidSessions {
      ...SessionFields
    }
  }
  ${SESSION_FIELDS}
`;

export const CREATE_SESSION = gql`
  mutation CreateSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      ...SessionFields
    }
  }
  ${SESSION_FIELDS}
`;

export const UPDATE_SESSION_PAYMENT = gql`
  mutation UpdateSessionPayment($id: ID!, $paymentStatus: PaymentStatus!) {
    updateSessionPayment(id: $id, paymentStatus: $paymentStatus) {
      _id
      paymentStatus
    }
  }
`;

export const ALL_TESTIMONIALS = gql`
  query AllTestimonials {
    allTestimonials {
      _id
      parentAuthor
      message
      rating
      isApproved
      createdAt
    }
  }
`;

export const SET_TESTIMONIAL_APPROVAL = gql`
  mutation SetTestimonialApproval($id: ID!, $isApproved: Boolean!) {
    setTestimonialApproval(id: $id, isApproved: $isApproved) {
      _id
      isApproved
    }
  }
`;