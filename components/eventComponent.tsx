import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHourglassEnd, faHourglassStart, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Event from "../models/event";

function EventComponent(event: Event) {
    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <View style={{alignItems: 'center'}}>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10
                    }}>
                        <Text style={styles.title}>{event?.name}</Text>
                        <Text style={styles.type}>{event?.type}</Text>
                    </View>
                    <Image source={{uri: event?.photo}} style={{width: "98%", height: 200}}/>
                    <View style={styles.infoSection}>
                        {event?.address ?
                            <View style={styles.infoRow}>
                                <FontAwesomeIcon icon={faLocationDot} size={26}/>
                                <Text style={styles.infoText}>{event.address}</Text>
                            </View>
                            : null
                        }
                        {event?.startDate ?
                            <View style={styles.infoRow}>
                                <FontAwesomeIcon icon={faHourglassStart} size={26}/>
                                <Text style={styles.infoText}>{moment(event?.startDate.toMillis()).format('D-MM-YYYY HH:mm')}</Text>
                            </View>
                            : null
                        }
                        {event?.endDate ?
                            <View style={styles.infoRow}>
                                <FontAwesomeIcon icon={faHourglassEnd} size={26}/>
                                <Text style={styles.infoText}>{moment(event?.endDate.toMillis()).format('D-MM-YYYY HH:mm')}</Text>
                            </View>
                            : null
                        }
                    </View>
                    <View style={styles.descriptionSection}>
                        <Text style={styles.descriptionTitle}>Description</Text>

                        <Text style={styles.descriptionContent}>{event?.description}</Text>

                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "center",
    },

    panel: {
        bottom: 0,
        padding: 20,
        backgroundColor: '#F3F3F3',
        paddingTop: 20,
        width: '95%',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    title: {
        textAlign: "left",
        fontSize: 30,
        height: 35,
        fontWeight: "bold"
    },
    type: {
        fontSize: 20
    },

    infoSection: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        paddingTop: 15,
    },
    infoRow: {
        display: "flex",
        width: "100%",
        alignItems: "stretch",
        flexDirection: "row",
        paddingBottom: 10
    },
    infoText: {
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 26
    },
    descriptionSection: {
        paddingTop: 10
    },
    descriptionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10
    },
    descriptionContent: {
        fontSize: 14,
        color: 'gray'
    }
});

export default withNavigation(EventComponent)
