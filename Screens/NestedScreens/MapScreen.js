import { Text, View } from "react-native"
import MapView, {Marker} from "react-native-maps"

export const MapScreen = () => {
    return (
        <View style={{flex:1}}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    longitude: 37.421998333333335,
                    latitude: -122.084,
                    longitudeDelta: 0.091,
                    latitudeDelta: 0.091,
                }}
            >
                <Marker coordinate={{longitude: 37.421998333333335,
                    latitude: -122.084,}} title="foto"/>
            </MapView>
        </View>
    )
}