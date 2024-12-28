// Queries
export { GET_CATEGORIES } from './queries/getCategories';
export { GET_PROMPT } from './queries/getPrompt';
export { GET_PROMPTS } from './queries/getPrompts';
export { GET_USER } from './queries/getUser';
export { GET_CURRENT_USER } from './queries/getCurrentUser';
export { SEARCH_PROMPTS } from './queries/searchPrompts';
export { GET_PROMPTS_BY_CATEGORY } from './queries/getPromptsByCategory';
export { GET_PROMPT_REVIEWS } from './queries/getPromptReviews';
export { GET_TOP_PROMPTS } from './queries/getTopPrompts';
export { GET_PROMPT_COMMENTS } from './queries/getPromptComments';
export { GET_USER_COMMENTS } from './queries/getUserComments';

// Auth Mutations
export { LOGIN, REGISTER, UPDATE_PROFILE, CHANGE_PASSWORD } from './mutations/auth';

// Prompt Mutations
export { CREATE_PROMPT, UPDATE_PROMPT, DELETE_PROMPT, SAVE_PROMPT, UNSAVE_PROMPT } from './mutations/prompt';

// Review Mutations
export { CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from './mutations/review';

// Comment Mutations
export { CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from './mutations/comment';

// Category Mutations
export { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './mutations/category';

// Social Mutations
export { LIKE_PROMPT, UNLIKE_PROMPT, FOLLOW_USER, UNFOLLOW_USER, REPORT_PROMPT } from './mutations/social';
