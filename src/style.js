export const overlay = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: '1111'
}
export const overlay1 = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: '1111',

}
export const mainPopupBoxSmall = {
  position: 'fixed',
  zIndex: '11111',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'auto',
  width: {
    xs: '90%',
    sm: '90%',
    md: '45%',
    lg: '35%',
    xl: '35%'
  },
  border: '1px solid #00000012',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '16px',
}
export const mainPopupBoxLarge = {
  position: 'fixed',
  zIndex: '11111',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '90vh',
  overflow: 'auto',
  width: {
    xs: '90%',
    sm: '90%',
    md: '60%',
    lg: '60%',
    xl: '40%'
  },
  border: '1px solid #00000012',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '16px',
}