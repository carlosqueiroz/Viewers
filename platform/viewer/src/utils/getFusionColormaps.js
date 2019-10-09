import cornerstone from 'cornerstone-core';

export default () => {
  const colormapsList = cornerstone.colors.getColormapsList();
  const options = [{key: 'None', value: ''}];
  colormapsList.forEach(cMap => {
    if(cMap.name && cMap.id)
      options.push({key: cMap.name, value: cMap.id});
  });
  return options;
};
