import axios from "axios";
import { getMainApi } from 'src/config'

const c = (path: string = ''): string => {
    return getMainApi().users + path;
};

export default {
    list: (): any => axios.get(c('/')),
};
