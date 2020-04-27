import React from 'react';
import ImageUploader from 'react-images-upload';
import { Storage } from '../services/firebaseConfig';

export default function Image({
    setSelectedFile
}) {
    const onDrop = (picture) => {
        let image = picture[0];
        if(image) {
            const now = Date.now().toString();
            const uploadTask = Storage.ref(`images/${now + image.name}`).put(image);
            uploadTask.on(
                "state_changed", snapshot => {
                    console.log("snapshot", snapshot)
                },
                error => {
                    console.log("image upload err", error)
                },
                () => {
                    Storage.ref("images").child(now + image.name).getDownloadURL().then(url=>{
                        setSelectedFile(url);
                    })
                }
            )
        }
    }
    return (
        <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            onChange={onDrop}
            imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
        />
    );
}
 
 
    