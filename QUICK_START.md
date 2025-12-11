# Todo List Application - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites Check
```bash
# Check Java
java -version
# Should show Java 17 or higher

# Check MySQL
mysql --version
# Should show MySQL 5.7 or higher

# Check Maven
mvn -version
# Should show Maven 3.6 or higher
```

### Step 1: Start MySQL
```bash
# Windows
# MySQL should start automatically

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Step 2: Navigate to Project
```bash
cd C:\Users\srira\Desktop\To-do-list
```

### Step 3: Build Project
```bash
mvn clean install
```

### Step 4: Run Application
```bash
mvn spring-boot:run
```

### Step 5: Open Browser
```
http://localhost:8080
```

## 🎯 First Steps

1. **Create a User**
   - Go to Users page
   - Fill in name, email, contact
   - Click "Create User"

2. **Create a Tag**
   - Go to Tags page
   - Enter tag name and description
   - Click "Create Tag"

3. **Create a Task**
   - Go to Tasks page
   - Select user
   - Enter title and description
   - Set priority and status
   - Click "Create Task"

4. **View Reports**
   - Go to Reports page
   - See statistics and task lists

## 🔧 Common Commands

### Build
```bash
mvn clean install
```

### Run
```bash
mvn spring-boot:run
```

### Run JAR
```bash
java -jar target/todo-list-app-1.0.0.jar
```

### Change Port
Edit `src/main/resources/application.properties`:
```properties
server.port=8081
```

### Database Credentials
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

## 📱 Web Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | http://localhost:8080 | Dashboard |
| Tasks | http://localhost:8080/tasks | Manage tasks |
| Users | http://localhost:8080/users | Manage users |
| Tags | http://localhost:8080/tags | Manage tags |
| Reports | http://localhost:8080/reports | View reports |

## 🔌 API Quick Reference

### Create User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","contact":"123"}'
```

### Get All Tasks
```bash
curl http://localhost:8080/api/tasks
```

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"title":"Task","priority":"HIGH","status":"PENDING"}'
```

### Search Tasks
```bash
curl "http://localhost:8080/api/tasks/search?priority=HIGH"
```

## ❌ Troubleshooting

### Port 8080 in use
```bash
# Change port in application.properties
server.port=8081
```

### MySQL not running
```bash
# Windows: Start MySQL service
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql
```

### Build fails
```bash
# Clear cache
mvn clean

# Rebuild
mvn install
```

### Database connection error
- Check MySQL is running
- Verify credentials in application.properties
- Check database name: todoapp_db

## 📚 Documentation

- **README.md** - Full project overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **API_DOCUMENTATION.md** - Complete API reference
- **PROJECT_SUMMARY.md** - Project details

## 🎨 Customization

### Change Port
```properties
server.port=8081
```

### Change Database
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
```

### Change Styling
Edit `src/main/resources/static/css/style.css`

## 🚀 Deployment

### Create JAR
```bash
mvn package
```

### Run JAR
```bash
java -jar target/todo-list-app-1.0.0.jar
```

### Docker (Optional)
Create `Dockerfile`:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/todo-list-app-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

Build and run:
```bash
docker build -t todo-app .
docker run -p 8080:8080 todo-app
```

## 📊 Sample Data

The application comes with sample data:
- 3 sample users
- 5 sample tags

Create more through the web interface!

## 🔐 Security Notes

For production:
1. Change default MySQL password
2. Use environment variables for credentials
3. Enable HTTPS
4. Add Spring Security
5. Use strong passwords

## 💡 Tips

- Use Postman for API testing
- Check browser console for JavaScript errors
- Check application logs for server errors
- Use browser DevTools for debugging
- Test on different browsers

## 📞 Need Help?

1. Check SETUP_GUIDE.md
2. Review API_DOCUMENTATION.md
3. Check application logs
4. Verify database connection
5. Ensure all prerequisites installed

## ✅ Verification Checklist

- [ ] Java 17+ installed
- [ ] MySQL running
- [ ] Maven installed
- [ ] Project built successfully
- [ ] Application running on port 8080
- [ ] Can access http://localhost:8080
- [ ] Can create users
- [ ] Can create tasks
- [ ] Can view reports

---

**You're all set! Happy task managing! 🎉**

