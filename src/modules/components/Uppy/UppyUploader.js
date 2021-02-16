import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/url/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import { checker, maker } from '../Slug/sluger'

function UppyUploader( space_slug, restrictions, autoProceed ) {

  const uppy = Uppy({
    id: 'uppy-media',
    meta: { type: 'avatar' },
    restrictions: restrictions,
    autoProceed: autoProceed,
    onBeforeUpload: (files) => {
      const updatedFiles = {};

      Object.keys(files).forEach((fileID) => {
        const fileName = files[fileID].meta.name.replace(/\.[^/.]+$/, '');
        const name = checker.test(fileName) ? files[fileID].meta.name : maker(fileName);
        updatedFiles[fileID] = {
          ...files[fileID],
          file_name: name,
          meta: {
            ...files[fileID].meta,
            name:
              space_slug +
              '/' +
              new Date().getFullYear() +
              '/' +
              new Date().getMonth() +
              '/' +
              Date.now().toString() +
              '_' +
              name,
          },
        };
      });
      return updatedFiles;
    },
  })
  
  uppy.on('file-added', (file) => {
    const data = file.data;
    const url = data.thumbnail ? data.thumbnail : URL.createObjectURL(data);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      uppy.setFileMeta(file.id, { width: image.width, height: image.height });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
    };
  });
     return uppy;
}

export default UppyUploader;
