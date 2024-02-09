export const SOCKET_PORT = 3005;

export const COOKIE_FAVORITE_KEY = "myfavoriteid";


export const MAX_SIZE_ITEM_LABLE = 32;
export const MIN_SIZE_ITEM_LABLE = 1;

export const MAX_SIZE_ITEM_DESCRIPTION = 2000;
// export const MIN_SIZE_ITEM_DESCRIPTION = 0;

export const MAX_ITEM_PRICE = 1_000_000;
export const MIN_ITEM_PRICE = 0;
export const DEFAULT_ITEM_PRICE = 0;




//settings for converter file
export const CONVERT_TO_MAX_WIDTH = 1024*16;
export const CONVERT_TO_MAX_HEIGHT = 1024*16;



//maximum count of pictures
export const MAX_COUNT_PICTURES = 12;
// export const MIN_COUNT_PICTURES = 0;

export const MAX_ASPECT_RATION_PICTURE = 3;
export const MAX_WIDTH_PICTURE = 4*1024;
export const MAX_HEIGHT_PICTURE = 4*1024;
// export const MIN_WIDTH_PICTURE = 16;
// export const MIN_HEIGHT_PICTURE = 16;

export const MAX_PIXELS_IN_PICTURE = MAX_WIDTH_PICTURE * MAX_HEIGHT_PICTURE;
export const MAX_FILE_SIZE_PICTURE = 1024*1024*8;//8MiB

export const PICTURE_SCALE_WIDTH_MAX = 801;
export const PICTURE_SCALE_WIDTH_0 = 800;
export const PICTURE_SCALE_WIDTH_1 = 400;
export const PICTURE_SCALE_WIDTH_2 = 250;
export const PICTURE_SCALE_WIDTH_3 = 64;




export const MAX_ASPECT_RATION_AVATAR = 2;
export const MAX_WIDTH_AVATAR = 4*1024;
export const MAX_HEIGHT_AVATAR = 4*1024;

export const MAX_PIXELS_AVATAR = MAX_WIDTH_AVATAR * MAX_HEIGHT_AVATAR;
export const MAX_FILE_SIZE_AVATAR = 1024*1024*8;//8MiB

export const AVATAR_SCALE_WIDTH_MAX = 257;
export const AVATAR_SCALE_WIDTH_0 = 256;
export const AVATAR_SCALE_WIDTH_1 = 64;



//for register
export const MAX_EMAIL_LENGHT = 64;
export const MIN_EMAIL_LENGHT = 3;
export const MAX_PASSWORD_LENGHT = 64;
export const MIN_PASSWORD_LENGHT = 4;
export const MAX_NAME_LENGHT = 16;
export const MIN_NAME_LENGHT = 0;
export const MAX_SURNAME_LENGHT = 16;
export const MIN_SURNAME_LENGHT = 0;

//after register
//count tempFavorite for transfer to favorite
export const TRANSFER_MAX_FAVORITE = 1024;



//main page
export const COUNT_ITEMS_LOAD = 10;
export const MAX_TAKE_ITEMS = 100;

//myitems page
export const MYITEMS_PAGE__TAKE_ITEMS = 64;
