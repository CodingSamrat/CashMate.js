import { ObjectId } from 'bson';


export const uId = () => {
    const id = new ObjectId();
    return id
}
