import { Icon } from "native-base";
import React, { useState } from "react";
import { View } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { colors } from '../style/AppStyle';

const ColorPickerModal = ({ navigation }) => {
    const [selectedColor, setSelectedColor] = useState(colors.headerColor);

    return (
        <View>
            <View >
                <Icon
                    style={{ color: selectedColor, marginLeft: 20, marginTop: 30, fontSize: 100 }}
                    type="Ionicons"
                    name="ios-bulb"
                    onPress={() => navigation.navigate("COLOR_PICKER")}
                />
            </View>
            <View style={{ height: 400, marginTop: 20 }}>
                <ColorPicker
                    defaultColor={colors.headerColor}
                    onColorSelected={color => setSelectedColor(color)}
                    onColorChange={color => setSelectedColor(fromHsv(color))}
                    style={{ flex: 1 }}
                />
            </View>
        </View>


    )
}


ColorPickerModal.navigationOptions = () => ({
    headerStyle: {
        backgroundColor: colors.headerColor
    },
    headerTintColor: colors.white,
})

export default ColorPickerModal;
