import {Button, Card, Input, Toggle, Text} from "@ui-kitten/components";
import {StyleSheet, View} from "react-native";
import {withNavigation} from "react-navigation";
import {useState} from "react";
import Filter from "../models/filter";

function FilterComponent(props) {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

    const [distance, setDistance] = useState(0)
    const [likes, setLikes] = useState(0)
    const [isActive, setIsActive] = useState(true)

    function createFilter() {
        const filter = new Filter()
        filter.distance = distance
        filter.isActive = isActive
        filter.likes = likes
        props.handleFilter(filter)
        setIsOpenMenu(false)
        return filter
    }

    function resetFilter() {
        const filter = new Filter()
        setDistance(0)
        setLikes(0)
        setIsActive(true)
        setIsOpenMenu(false)
        props.handleFilter(filter)
        return filter
    }
    if(isOpenMenu)
        return (<View style={{
            width: "70%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 999
        }}>
            <Card
                style={{
                    height: "100%"
                }}
            >
                <Input
                    style={{
                        marginTop:10
                    }}
                    label={"Ilość like'ów"}
                    value={likes}
                    onChangeText={(likesVal) => setLikes(likesVal)}
                />
                <Input
                    style={{
                        marginTop:10
                    }}
                    label={"Jak daleko od ciebie?"}
                    value={distance}
                    onChangeText={(distanceVal) => setDistance(distanceVal)}
                />
                <Text
                    style={{
                        marginTop:10
                    }}
                    category='label'
                >
                    Pokaż tylko obecne i przyszłe
                </Text>
                <Toggle
                    style={{
                        marginTop:5
                    }}
                    checked={isActive}
                    onChange={(val) => setIsActive(val)}
                />
                <Button

                    style={styles.button}
                    onPress={() => createFilter()}
                >
                    Filtruj
                </Button>
                <Button
                    style={styles.button}
                    onPress={() => resetFilter()}
                >
                    Reset
                </Button>
            </Card>
        </View>)
    else return (
        <View
            style={{
            position: "absolute",
            left: 10,
            top: 10,
            zIndex: 999
        }}>
            <Button
                style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: "rgba(43,166,243,0.73)"
                }}
                onPress={() => setIsOpenMenu(!isOpenMenu)}
            >
                Filtry
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        paddingTop: 10,
        marginTop: 10
    }
})
export default withNavigation(FilterComponent)
