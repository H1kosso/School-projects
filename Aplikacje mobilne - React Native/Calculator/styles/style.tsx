import {
  StyleSheet
} from 'react-native'

import { calculatePercentOccupation, array2Dims } from '../utils/utils'

export function calculatorStyles(dims: array2Dims) : StyleSheet.NamedStyles<any>{
  return StyleSheet.create({
    mainView:{
      padding: 0,
      margin: 0,
      flex: 1,
      backgroundColor: '#d7d7d7',
    },
  
    displayContainer:{
      flex: 0.32,
      alignItems: 'flex-end',
      justifyContent: 'center',
      text:{
        fontSize: 64,
        fontWeight: 'bold',
        color: 'black',
        padding: 8
      }
    },
  
    keysContainer:{
      flex: 0.68,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
  
    button:{
      width: calculatePercentOccupation(dims.column),
      height: calculatePercentOccupation(dims.row),
      justifyContent: 'center',
      alignItems: 'center',
      text:{
        fontSize: 40,
        textAlign: 'center',
      }
    }
  
  });
}