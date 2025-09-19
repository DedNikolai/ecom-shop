export const serverRoutes = {
    _AUTH_REFRESH: '/auth/refresh',
    _AUTH_LOGOUT: '/auth/logout',
    _AUTH_ME: '/auth/me',
    _AUTH_LOGIN: '/auth/login',
    _AUTH_REGISTER: '/auth/register',
    _ITEMS: '/items',
    _USERS_ME: '/users/me',
    _CATEGORIES: '/category',
    _IMAGE_UPLOAD: '/file/upload/images',
    _FILE_IMAGES: '/file/images'
}

export const SERVER_API = process.env.NEXT_PUBLIC_API_URL