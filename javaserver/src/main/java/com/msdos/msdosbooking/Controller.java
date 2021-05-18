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

  @Autowired
  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @RequestMapping("/")
  public String index() {
    return "MS DOS BOOKING SYSTEM (API)";
  }

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

  @CrossOrigin
  @PostMapping("/laundryBookings")
  public String postLaundryBookings(@RequestBody String requestBody) {
    addToTable(requestBody, "LaundryBookings");
    return "Updated database with new LaundryBooking";
  }

  @CrossOrigin
  @PostMapping("/roomBookings")
  public String postRoomBookings(@RequestBody String requestBody) {
    addToTable(requestBody, "roomBookings");
    return "Updated database with new Roombooking";
  }

  @CrossOrigin
  @PostMapping("/gymBookings")
  public String postGymBookings(@RequestBody String requestBody) {
    addToTable(requestBody, "GymBookings");
    return "Updated database with new GymBooking";
  }

  private void addToTable(String requestBody, String table) {
    JSONObject obj = new JSONObject(requestBody);
    TemporalAccessor ta = DateTimeFormatter.ISO_INSTANT.parse(obj.getString("start_time"));
    Instant i = Instant.from(ta);
    Timestamp start_time = Timestamp.from(i);

    TemporalAccessor ta2 = DateTimeFormatter.ISO_INSTANT.parse(obj.getString("end_time"));
    Instant i2 = Instant.from(ta2);
    Timestamp end_time = Timestamp.from(i2);
    int apartmentNo = obj.getInt("apartmentNo");
    jdbcTemplate.update(
        "INSERT INTO " + table + " VALUES (?,?,?,?)", start_time, end_time, apartmentNo, Math.abs(requestBody.hashCode())); // TODO: This should generate some id
    System.out.println("Updating laundrybookings");
  }

  @CrossOrigin
  @DeleteMapping("/gymBookings/{someID}")
  public void deleteGymBooking(
          @PathVariable(value="someID") Optional<Integer> id
  ){
    id.ifPresent(integer -> deleteFromTable("GymBookings", integer));
  }

  @CrossOrigin
  @DeleteMapping("/laundryBookings/{someID}")
  public void deleteLaundryBooking(
          @PathVariable(value="someID") Optional<Integer> id
  ){
    id.ifPresent(integer -> deleteFromTable("LaundryBookings", integer));
  }

  @CrossOrigin
  @DeleteMapping("/roomBookings/{someID}")
  public void deleteRoomBooking(
          @PathVariable(value="someID") Optional<Integer> id
  ){
    id.ifPresent(integer -> deleteFromTable("RoomBookings", integer));
  }

  private void deleteFromTable(String table, int id){
    jdbcTemplate.update(
            "DELETE FROM " + table + " WHERE id = ?;", id);
    System.out.println("Deleting " + id + "from " + table);
  }

  @CrossOrigin
  @DeleteMapping("/users/{someID}")
  public String deleteUsers(@PathVariable(value="someID") Optional<Integer> id, @RequestParam Optional<Integer> apartmentNo) {
    String status = null;
    if (apartmentNo.isPresent()) {
      int statusCode =
              jdbcTemplate.update(
                      "DELETE FROM users WHERE apartment_no = ?", apartmentNo.get());
      status=String.valueOf(statusCode);
    } else if (id.isPresent()){
      int statusCode = jdbcTemplate.update(
              "DELETE FROM users WHERE id = ?", id.get());
      status=String.valueOf(statusCode);
    } else {
      status = "Failed to delete check apartment number";
    }

    return status;
  }

  @CrossOrigin
  @PostMapping("/users")
  public boolean addUser(
          @RequestBody String requestBody
  ){
    JSONObject obj = new JSONObject(requestBody);
    int apartment_no = obj.getInt("apartmentNo");
    String email = obj.getString("email");
    String password = obj.getString("password");
    int id = obj.getInt("id");
    String role = obj.getString("role");
    int status = jdbcTemplate.update(
            "INSERT INTO users VALUES (?,?,?,?,?)", apartment_no,email,password,id,role);
    return status == 1;
  }


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
    } else if (id.isPresent()){
      sb.append(" WHERE id = ?;");
      result = jdbcTemplate.queryForObject(sb.toString(), String.class, role.get());
    }
    else {
      sb.append(';');
      result = jdbcTemplate.queryForObject(sb.toString(), String.class);
    }
    // The thought here is to append all the given parameters to give complex
    // result, can be done with if statement
    // sb.append("1=1;")

    // Shouldn't return null. Empty json array instead
    if(result == null){
      result = "[]";
    }

    System.out.println(sb.toString());
    return result;
  }
}
