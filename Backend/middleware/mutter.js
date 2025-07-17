import multer from 'multer'

const upload = multer({storage: multer.diskStorage({})})

export {upload}