import React from 'react'
import { format, addDays, startOfWeek } from "date-fns";
import { Container, Row, Col } from 'react-bootstrap';
import TimeStambs from './TimeStambs'
import LaundryTimeStamps from '../../Data/laundryTimeStamps.json'

export default function WeekDays() {

    let date = new Date()

    const weekDayFormat = "PPPP";
    let firstDayInWeek = startOfWeek(date)
    const days = [];
    for (let i = 1; i < 8; i++) {
        days.push(
            <Col key={i}>
                <h6 id={"weekday" + i}>
                    {format(addDays(firstDayInWeek, i), weekDayFormat)}
                    <TimeStambs timeIntervall={LaundryTimeStamps} />
                </h6>
            </Col>
        );
    }

    return (
        <Container fluid>
            <Row classname="days">
                {days}
            </Row>
        </Container>
    )
}
