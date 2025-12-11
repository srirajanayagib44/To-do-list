# Todo List Application - Complete Setup Guide

## Quick Start

### Step 1: Prerequisites Installation

#### Windows
1. **Install Java 17**
   - Download from: https://www.oracle.com/java/technologies/downloads/#java17
   - Run installer and follow instructions
   - Verify: Open Command Prompt and run `java -version`

2. **Install MySQL**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Run installer and follow instructions
   - Default port: 3306
   - Default user: root
   - Set password during installation

3. **Install Maven**
   - Download from: https://maven.apache.org/download.cgi
   - Extract to a folder (e.g., C:\maven)
   - Add to PATH environment variable
   - Verify: Open Command Prompt and run `mvn -version`

#### macOS
```bash
# Using Homebrew
brew install java17
brew install mysql
brew install maven

# Verify installations
java -version
mysql --version
mvn -version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install openjdk-17-jdk
sudo apt install mysql-server
sudo apt install maven

# Verify installations
java -version
mysql --version
mvn -version
```

### Step 2: Database Setup

1. **Start MySQL Service**
   - Windows: MySQL should start automatically
   - macOS: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

2. **Create Database User (Optional)**
   ```bash
   mysql -u root -p
   # Enter password when prompted
   
   # Create database (will be auto-created by app)
   CREATE DATABASE todoapp_db;
   
   # Exit
   EXIT;
   ```

### Step 3: Configure Application

1. **Update Database Credentials**
   - Open: `src/main/resources/application.properties`
   - Update these lines if needed:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

### Step 4: Build and Run

1. **Navigate to Project Directory**
   ```bash
   cd C:\Users\srira\Desktop\To-do-list
   ```

2. **Build the Project**
   ```bash
   mvn clean install
   ```
   This will:
   - Download all dependencies
   - Compile the code
   - Run tests
   - Create JAR file

3. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```
   
   Or run the JAR directly:
   ```bash
   java -jar target/todo-list-app-1.0.0.jar
   ```

4. **Access the Application**
   - Open browser: http://localhost:8080
   - You should see the Todo List home page

## Project Structure

```
To-do-list/
├── src/
│   ├── main/
│   │   ├── java/com/todoapp/
│   │   │   ├── controller/
│   │   │   │   ├── UserController.java
│   │   │   │   ├── TaskController.java
│   │   │   │   ├── TagController.java
│   │   │   │   ├── ReportController.java
│   │   │   │   └── WebController.java
│   │   │   ├── service/
│   │   │   │   ├── UserService.java
│   │   │   │   ├── TaskService.java
│   │   │   │   └── TagService.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── TaskRepository.java
│   │   │   │   └── TagRepository.java
│   │   │   ├── model/
│   │   │   │   ├── User.java
│   │   │   │   ├── Task.java
│   │   │   │   ├── Tag.java
│   │   │   │   ├── Priority.java
│   │   │   │   └── Status.java
│   │   │   ├── dto/
│   │   │   │   ├── UserDTO.java
│   │   │   │   ├── TaskDTO.java
│   │   │   │   └── TagDTO.java
│   │   │   └── TodoApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── schema.sql
│   │       ├── static/
│   │       │   ├── css/style.css
│   │       │   └── js/
│   │       │       ├── tasks.js
│   │       │       ├── users.js
│   │       │       ├── tags.js
│   │       │       └── reports.js
│   │       └── templates/
│   │           ├── index.html
│   │           ├── tasks.html
│   │           ├── users.html
│   │           ├── tags.html
│   │           └── reports.html
│   └── test/
├── pom.xml
├── README.md
├── SETUP_GUIDE.md
└── .gitignore
```

## Application Features

### 1. Home Page (/)
- Dashboard with statistics
- Quick access buttons
- Overview of features

### 2. Tasks Management (/tasks)
- Create new tasks
- Edit existing tasks
- Delete tasks
- Filter by tag, priority, status
- View all tasks in table format

### 3. Users Management (/users)
- Create new users
- Edit user information
- Delete users
- View all users

### 4. Tags Management (/tags)
- Create new tags
- Edit tags
- Delete tags
- View all tags

### 5. Reports (/reports)
- View pending tasks
- View completed tasks
- Statistics by priority
- Statistics by status
- Dashboard metrics

## API Testing

### Using cURL

**Create a User:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"contact\":\"1234567890\"}"
```

**Get All Users:**
```bash
curl http://localhost:8080/api/users
```

**Create a Task:**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"userId\":1,\"title\":\"My Task\",\"description\":\"Task description\",\"priority\":\"HIGH\",\"status\":\"PENDING\"}"
```

**Get All Tasks:**
```bash
curl http://localhost:8080/api/tasks
```

**Search Tasks:**
```bash
curl "http://localhost:8080/api/tasks/search?priority=HIGH&status=PENDING"
```

## Troubleshooting

### Issue: "Connection refused" when starting app
**Solution:**
- Ensure MySQL is running
- Check database credentials in application.properties
- Verify MySQL port (default 3306)

### Issue: "Port 8080 already in use"
**Solution:**
- Change port in application.properties: `server.port=8081`
- Or kill process using port 8080

### Issue: "Maven command not found"
**Solution:**
- Ensure Maven is installed
- Add Maven to PATH environment variable
- Restart terminal/command prompt

### Issue: "Java version not compatible"
**Solution:**
- Ensure Java 17 or higher is installed
- Check: `java -version`
- Update JAVA_HOME environment variable

### Issue: Database tables not created
**Solution:**
- Check application.properties: `spring.jpa.hibernate.ddl-auto=update`
- Check MySQL logs for errors
- Manually run schema.sql if needed

## Performance Tips

1. **Indexing**: Database indexes are already configured
2. **Caching**: Consider adding Spring Cache for frequently accessed data
3. **Pagination**: Add pagination for large task lists
4. **Lazy Loading**: Relationships use lazy loading by default

## Security Considerations

For production deployment:
1. Add Spring Security for authentication
2. Use environment variables for database credentials
3. Enable HTTPS
4. Add input validation and sanitization
5. Implement rate limiting
6. Add CORS configuration

## Next Steps

1. Test all features through the web interface
2. Create sample data (users, tasks, tags)
3. Test API endpoints using cURL or Postman
4. Customize styling in `static/css/style.css`
5. Add additional features as needed

## Support Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- MySQL Documentation: https://dev.mysql.com/doc/
- Maven Documentation: https://maven.apache.org/guides/

---

**Happy coding! 🚀**

