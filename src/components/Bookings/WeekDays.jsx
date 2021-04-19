import React from 'react'
import { format, addDays, startOfWeek } from "date-fns";
import { Container, Row, Col } from 'react-bootstrap';

export default function WeekDays() {

    let date = new Date()

    const weekDayFormat = "PPPP";
    let firstDayInWeek = startOfWeek(date)
    const days = [];
    for (let i = 1; i < 8; i++) {
        days.push(
            <div key={i}>
                <pre id={"weekday" + i}>
                    {format(addDays(firstDayInWeek, i), weekDayFormat)}
                </pre>
            </div>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div classname="days">
                        {days}
                    </div>

                </Col>

            </Row>
        </Container>
    )
}
