
export const normal = '#333';
export const blue = '#339af0';
export const ActBlue = '#334aaf';

export const Color = {
  red: 'ff7473',
  yellow: 'ffc952',
  skyblue: '47b8e0',
  blue: '34314c',
  jan: '#8E3C36',
  feb: '#6EA2D5',
  mar: '#EB3C27',
  apr: '#EAD94E',
  may: '#D9AFCA',
  jun: '#EB9687',
  jul: '#00A28A',
  aug: '#5F4B8B',
  sep: '#684832',
  oct: '#E7DCD9',
  nov: '#BA69A1',
  dec: '#C0D725',
}

export const ellipse = (lineCnt, lineHeight) =>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${lineCnt};
  -webkit-box-orient: vertical;
  word-wrap:break-word; 
  line-height: ${lineHeight}em;
  height: ${lineHeight * lineCnt}em; 
`;