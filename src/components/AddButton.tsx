import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { parme } from '../constants/Colors';
import { forwardRef } from 'react';
import { useTheme } from '@react-navigation/native';

type AddButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const AddButton = forwardRef<View | null, AddButtonProps>(

  ({ text, ...pressableProps }, ref) => {

    const {colors} = useTheme();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.buttonBackground, // Use dynamic background color
        padding: 15,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
      },
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.buttonText,
      },
    });


    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.light.tint,
//     padding: 15,
//     alignItems: 'center',
//     borderRadius: 100,
//     marginVertical: 10,
//     // width: '20%',
//     // aspectRatio: 1,
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'white',
//   },
// });

export default AddButton;
