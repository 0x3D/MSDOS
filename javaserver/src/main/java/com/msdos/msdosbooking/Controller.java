package com.msdos.msdosbooking;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Optional;

@RestController
public class Controller {

  private JdbcTemplate jdbcTemplate;

  /**
   * Spring boot automatically connects jdbcTemplate to database
   *
   * @param jdbcTemplate springboot sets this to database access.
   */
  @Autowired
  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  /**
   * This is the homepage of the API
   *
   * @return the homepage
   */
  @RequestMapping("/")
  public String index() {
    return "MS DOS BOOKING SYSTEM (API)";
  }

  /**
   * This is the endpoint /roomBookings
   *
   * @param start_time This param is given by the request. Not used currently.
   * @param end_time This param is given by the request. Not used currently
   * @param apartmentNo This param is given by the request. Filters to give only apartmentNo
   * @param id This param is given by the request. Not used currently.
   * @return A json array of room bookings.
   */
  @CrossOrigin
  @GetMapping("/roomBookings")
  public String roomBookings(
      @RequestParam Optional<String> start_time,
      @RequestParam Optional<String> end_time,
      @RequestParam Optional<Integer> apartmentNo,
      @RequestParam Optional<Integer> id) {
    String response = getResponse(apartmentNo, "RoomBookings");
    return response;
  }

  /** This is the endpoint /gymBookings
   *
   * @param start_time This param is given by the request. Not used currently.
   * @param end_time This param is given by the request. Not used currently
   * @param apartmentNo This param is given by the request. Filters to give only bookings with a specific apartmentNo
   * @param id This param is given by the request. Not used currently.
   * @return A json array of gym bookings.
   */
  @CrossOrigin
  @GetMapping("/gymBookings")
  public String gymBookings(
      @RequestParam Optional<String> start_time,
      @RequestParam Optional<String> end_time,
      @RequestParam Optional<Integer> apartmentNo,
      @RequestParam Optional<Integer> id) {
    String response = getResponse(apartmentNo, "GymBookings");
    return response;
  }

  /** This is the endpoint /laundryBookings
   *
   * @param start_time This param is given by the request. Not used currently.
   * @param end_time This param is given by the request. Not used currently
   * @param apartmentNo This param is given by the request. Filters to give only bookings with a specific apartmentNo
   * @param id This param is given by the request. Not used currently.
   * @return A json array of laundry bookings.
   */
  @CrossOrigin
  @GetMapping("/laundryBookings")
  public String getLaundryBookings(
      @RequestParam Optional<String> start_time,
      @RequestParam Optional<String> end_time,
      @RequestParam Optional<Integer> apartmentNo,
      @RequestParam Optional<Integer> id) {
    String response = getResponse(apartmentNo, "LaundryBookings");
    return response;
  }

  private String getResponse(Optional<Integer> apartmentNo, String table) {
    String response;
    if (apartmentNo.isPresent()) {
      String sql =
          "SELECT jsonb_agg(jsonb_build_object('start_time',start_time,'end_time',end_time,'apartmentNo',apartment_no,'id',id)) FROM "
              + table
              + " WHERE apartment_no = ?;";
      response = jdbcTemplate.queryForObject(sql, String.class, apartmentNo.get());
    } else {
      String sql =
          "SELECT jsonb_agg(jsonb_build_object('start_time',start_time,'end_time',end_time,'apartmentNo',apartment_no,'id',id)) FROM "
              + table
              + ";";
      response = jdbcTemplate.queryForObject(sql, String.class);
    }
    if (response == null) { // No entries in SQL
      response = "[]";
    }
    return response;
  }

  /**
   * Adds a booking to the database
   * @param requestBody given by the request as body. JSON object with booking data.
   * @return a string to indicate that update worked.
   */
  @CrossOrigin
  @PostMapping("/laundryBookings")
  public String postLaundryBookings(@RequestBody String requestBody) {
    addToTable(requestBody, "LaundryBookings");
    return "Updated database with new LaundryBooking";
  }

  /**
   * Adds a booking to the database
   * @param requestBody given by the request as body. JSON object with booking data.
   * @return a string to indicate that update worked.
   */
  @CrossOrigin
  @PostMapping("/roomBookings")
  public String postRoomBookings(@RequestBody String requestBody) {
    addToTable(requestBody, "roomBookings");
    return "Updated database with new Roombooking";
  }

  /**
   * Adds a booking to the database
   * @param requestBody given by the request as body. JSON object with booking data.
   * @return a string to indicate that update worked.
   */
  @CrossOrigin
  @PostMapping("/gymBookings")
  public String postGymBookings(@RequestBody String requestBody) {
    addToTable(requestBody, "GymBookings");
    return "Updated database with new GymBooking";
  }

  private void addToTable(String requestBody, String table) {
    JSONObject obj = new JSONObject(requestBody);

    //This is because Database expects time in a certain way.
    TemporalAccessor taStartTime = DateTimeFormatter.ISO_INSTANT.parse(obj.getString("start_time"));
    Instant iStartTime = Instant.from(taStartTime);
    Timestamp start_time = Timestamp.from(iStartTime);

    TemporalAccessor taEndTime = DateTimeFormatter.ISO_INSTANT.parse(obj.getString("end_time"));
    Instant iEndTime = Instant.from(taEndTime);
    Timestamp end_time = Timestamp.from(iEndTime);
    int apartmentNo = obj.getInt("apartmentNo");
    jdbcTemplate.update(
        "INSERT INTO " + table + " VALUES (?,?,?,?)",
        start_time,
        end_time,
        apartmentNo,
        Math.abs(requestBody.hashCode())); // TODO: This should generate some id
    System.out.println("Updating laundrybookings");
  }

  /**
   * Remove a gym booking
   * @param id given by /gymbookings/id in the request
   */
  @CrossOrigin
  @DeleteMapping("/gymBookings/{someID}")
  public void deleteGymBooking(@PathVariable(value = "someID") Optional<Integer> id) {
    id.ifPresent(integer -> deleteFromTable("GymBookings", integer));
  }

  /**
   * Remove a laundry booking
   * @param id given by /laundryBookings/id in the request
   */
  @CrossOrigin
  @DeleteMapping("/laundryBookings/{someID}")
  public void deleteLaundryBooking(@PathVariable(value = "someID") Optional<Integer> id) {
    id.ifPresent(integer -> deleteFromTable("LaundryBookings", integer));
  }

  /**
   * Remove a room booking
   * @param id given by /roomBookings/id in the request
   */
  @CrossOrigin
  @DeleteMapping("/roomBookings/{someID}")
  public void deleteRoomBooking(@PathVariable(value = "someID") Optional<Integer> id) {
    id.ifPresent(integer -> deleteFromTable("RoomBookings", integer));
  }

  private void deleteFromTable(String table, int id) {
    jdbcTemplate.update("DELETE FROM " + table + " WHERE id = ?;", id);
    System.out.println("Deleting " + id + "from " + table);
  }

  /**
   * Remove a user
   * @param id given by /users/id in the request
   * @param apartmentNo given by /users?apartmentNo, removes by id
   */
  @CrossOrigin
  @DeleteMapping("/users/{someID}")
  public String deleteUsers(
      @PathVariable(value = "someID") Optional<Integer> id,
      @RequestParam Optional<Integer> apartmentNo) {
    String status = null;
    if (apartmentNo.isPresent()) {
      int statusCode =
          jdbcTemplate.update("DELETE FROM users WHERE apartment_no = ?", apartmentNo.get());
      status = String.valueOf(statusCode);
    } else if (id.isPresent()) {
      int statusCode = jdbcTemplate.update("DELETE FROM users WHERE id = ?", id.get());
      status = String.valueOf(statusCode);
    } else {
      status = "Failed to delete check apartment number";
    }

    return status;
  }

  /**
   * Adds a user
   * @param requestBody given by the request. Json object with user
   * @return true if update worked, false otherwise
   */
  @CrossOrigin
  @PostMapping("/users")
  public boolean addUser(@RequestBody String requestBody) {
    JSONObject obj = new JSONObject(requestBody);
    int apartment_no = obj.getInt("apartmentNo");
    String email = obj.getString("email");
    String password = obj.getString("password");
    int id = obj.getInt("id");
    String role = obj.getString("role");
    int status =
        jdbcTemplate.update(
            "INSERT INTO users VALUES (?,?,?,?,?)", apartment_no, email, password, id, role);
    return status == 1;
  }

  /**
   * Gets users. Filter with ?parameters. Looks at apartmentNo first, then id and last role
   * @param apartmentNo filter by apartmentNo
   * @param email not used
   * @param password not used
   * @param id filter by id
   * @param role filter by role
   * @return json array with users matching filters.
   */
  @CrossOrigin
  @GetMapping("/users")
  public String users(
      @RequestParam Optional<Integer> apartmentNo,
      @RequestParam Optional<String> email,
      @RequestParam Optional<String> password,
      @RequestParam Optional<Integer> id,
      @RequestParam Optional<String> role) {
    String sql = getUserSqlQuery(apartmentNo, email, password, id, role);
    // ArrayList<String> users = getMatchingUsers(apartmentNo, email, password, id, role);
    // String s = jdbcTemplate.queryForObject(sql, String.class);
    return sql;
  }

  /**
   * Endpoint to get facilities
   * @return all facilities in database.
   */
  @CrossOrigin
  @GetMapping("facilities")
  public String getFacilities() {
    return jdbcTemplate.queryForObject(
        "SELECT jsonb_agg(jsonb_build_object('fac',name)) FROM facilities;", String.class);
  }

  private String getUserSqlQuery(
      Optional<Integer> apartmentNo,
      Optional<String> email,
      Optional<String> password,
      Optional<Integer> id,
      Optional<String> role) {
    String result;
    StringBuilder sb =
        new StringBuilder(
            "SELECT jsonb_agg(jsonb_build_object('apartmentNo',apartment_no,'email',email,'password',password,'role',role,'id',id)) FROM Users");
    if (apartmentNo.isPresent()) {
      sb.append(" WHERE apartment_no = ?;");
      result = jdbcTemplate.queryForObject(sb.toString(), String.class, apartmentNo.get());
    } else if (role.isPresent()) {
      sb.append(" WHERE role = ?;");
      result = jdbcTemplate.queryForObject(sb.toString(), String.class, role.get());
    } else if (id.isPresent()) {
      sb.append(" WHERE id = ?;");
      result = jdbcTemplate.queryForObject(sb.toString(), String.class, role.get());
    } else {
      sb.append(';');
      result = jdbcTemplate.queryForObject(sb.toString(), String.class);
    }
    // The thought here is to append all the given parameters to give complex
    // result, can be done with if statement
    // sb.append("1=1;")

    // Shouldn't return null. Empty json array instead
    if (result == null) {
      result = "[]";
    }

    System.out.println(sb.toString());
    return result;
  }
}
