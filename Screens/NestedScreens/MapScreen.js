import { Text, View } from "react-native"
import MapView, {Marker} from "react-native-maps"

export const MapScreen = ({ route }) => {
    const { longitude, latitude } = route.params.location;
    return (
        <View style={{flex:1}}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    longitude,
                    latitude,
                    longitudeDelta: 0.091,
                    latitudeDelta: 0.091,
                }}
            >
            <Marker coordinate={{longitude, latitude,}} title="foto"/>
            </MapView>
        </View>
    )
}