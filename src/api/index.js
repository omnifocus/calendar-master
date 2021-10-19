import apiCreater from '@/utils/apiCreater'
import globalAPI from './global'
import callBackAPI from './callBack'

const api = apiCreater()
const global = globalAPI(api)
const callBack = callBackAPI(api)

export default {
    ...global,
    ...callBack,
}