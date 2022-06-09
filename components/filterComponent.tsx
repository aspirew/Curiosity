import {Button, Card, Input, Toggle} from "@ui-kitten/components";
import {View} from "react-native";
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
                    label={"Ilość like'ów"}
                    value={likes}
                    onChangeText={(likesVal) => setLikes(likesVal)}
                />
                <Input
                    label={"Jak daleko od ciebie?"}
                    value={distance}
                    onChangeText={(distanceVal) => setDistance(distanceVal)}
                />
                <Toggle
                    checked={isActive}
                    onChange={(val) => setIsActive(val)}
                />
                <Button
                    onPress={() => createFilter()}
                >
                    Filtruj
                </Button>
                <Button>
                    Reset
                </Button>
            </Card>
        </View>)
    else return (
        <View
            style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 999
        }}>
            <Button
                onPress={() => setIsOpenMenu(!isOpenMenu)}
            >
                Filtr
            </Button>
        </View>
    )
}

export default withNavigation(FilterComponent)
