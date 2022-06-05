import React, {useCallback, useEffect, useRef, useState} from 'react';
import {DefaultScreenProps} from '../common/DefaultScreenProps';
import MapView, {LatLng, MapEvent, Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {getEvent, getEvents} from "../services/dbService";
import BottomSheet from "reanimated-bottom-sheet";
import {Layout} from "@ui-kitten/components";
import Animated from "react-native-reanimated";
import Event from "../models/event";
import EventComponent from "../components/eventComponent";
import { getLoggedInUserUID } from '../services/authService';

type EventMarker = {
    id: string
    title: string
    description: string
    coordinate: LatLng
}

export default function MapScreen({navigation}: DefaultScreenProps) {
    const mapRef = useRef(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [eventMarkers, setEventMarkers] = useState<EventMarker[]>([]);
    const [pickedEvent, setPickedEvent] = useState<Event | undefined>(undefined);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventDocs = await getEvents();
            eventDocs.forEach(doc => {
                events.push(doc)
            })
            getLoggedInUserUID().then(uid => {
                if(!uid)
                    navigation.navigate("LoginScreen")
            })
            setEvents(events)
            setEventMarkers(prepareEventMarker(eventDocs))
        }

        fetchEvents().then(() => console.log("hello"));
        
    }, [events])

    function prepareEventMarker(eventDocs: Event[]) {
        return eventDocs.map(eventDoc => {
            return {
                id: eventDoc.id,
                title: eventDoc.name,
                // description: eventDoc.description,
                coordinate: {
                    latitude: !!eventDoc.latitude ? eventDoc.latitude : eventDoc.location.latitude,
                    longitude: !!eventDoc.longitude ? eventDoc.longitude : eventDoc.location.longitude,
                }
            }
        })
    }

    async function clickOnMarker(e: MapEvent) {
        setPickedEvent(null)
        const event = await getEvent(e.id)
        setPickedEvent(event)
        bs.current.snapTo(0)
    }

    const renderInner = () => (
        <EventComponent {...pickedEvent}/>
    );

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    return (
        <Layout style={{flex: 1}}>
            <View style={styles.container}>

                <MapView
                    ref={mapRef}
                    style={styles.map}
                >
                    {eventMarkers.map((marker, index) => (
                        <Marker
                            key={marker.id}
                            identifier={marker.id}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            onPress={e => {
                                clickOnMarker(e.nativeEvent);
                                bs.current.snapTo(0)

                            }}
                        />
                    ))}
                </MapView>

            </View>
            <BottomSheet
                style={styles.bottomSheet}
                ref={bs}
                snapPoints={[500, 25]}
                renderContent={renderInner}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    bottomSheet: {
        justifyContent: "flex-end",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 5,
        width: '100%'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    panelTitle: {
        textAlign: "left",
        fontSize: 27,
        height: 35
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
});
