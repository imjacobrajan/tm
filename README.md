# Netpulse Topology Manager

A comprehensive network topology and monitoring application with Grafana integration.

## 🚀 Quick Start

### Start Grafana and Prometheus

#### Option 1: Using the Quick Start Script (Recommended)

```bash
./start-grafana.sh
```

#### Option 2: Using Docker Compose Manually

```bash
# Start services
docker-compose -f docker-compose.grafana.yml up -d

# Check status
docker ps

# View logs
docker-compose -f docker-compose.grafana.yml logs -f
```

### Access the Services

Once started, you can access:

- **Grafana**: http://localhost:3000
  - Username: `admin`
  - Password: `admin` (you'll be prompted to change it)

- **Prometheus**: http://localhost:9090

## 📋 Prerequisites

### 1. Docker Desktop

Make sure Docker Desktop is installed and running:

- **Download**: https://www.docker.com/products/docker-desktop
- **Verify**: `docker --version`
- **Start**: Open Docker Desktop application

### 2. Node.js (for the main application)

- Node.js 16+ required
- Install from: https://nodejs.org/

## 🏗️ Project Structure

```
topology/
├── topology-manager/              # Main React application
│   ├── src/
│   │   ├── components/
│   │   │   └── Monitoring/
│   │   │       └── GrafanaDashboard.tsx  # Grafana integration component
│   │   └── ...
│   └── ...
├── grafana/                       # Grafana configuration
│   ├── provisioning/
│   │   ├── datasources/          # Auto-configured datasources
│   │   └── dashboards/           # Dashboard provisioning
│   └── dashboards/               # Pre-built dashboards
│       └── network-overview.json
├── prometheus/                    # Prometheus configuration
│   └── prometheus.yml
├── docker-compose.grafana.yml    # Docker Compose for Grafana/Prometheus
├── start-grafana.sh              # Quick start script
├── GRAFANA_SETUP.md              # Detailed Grafana setup guide
└── README.md                      # This file
```

## 🔧 Setup Instructions

### Step 1: Start Docker Desktop

1. Open Docker Desktop application
2. Wait for it to fully start (icon in menu bar should be stable)
3. Verify: `docker ps` should work without errors

### Step 2: Start Grafana and Prometheus

```bash
./start-grafana.sh
```

Or manually:

```bash
docker-compose -f docker-compose.grafana.yml up -d
```

### Step 3: Start the Main Application

```bash
cd topology-manager
npm install
npm run dev
```

### Step 4: Configure Grafana in the Application

1. Open the application (usually http://localhost:5173)
2. Navigate to **Monitoring** → **Grafana Dashboard**
3. Click **Configure**
4. Enter:
   - **Grafana Base URL**: `http://localhost:3000`
   - **Dashboard Path**: `/d/network-topology/network-topology-overview`
5. Click **Save Configuration**
6. Toggle **Embed Mode** to view Grafana within the app

## 📖 Documentation

- **[GRAFANA_SETUP.md](GRAFANA_SETUP.md)** - Complete Grafana setup and configuration guide
- **[topology-manager/GRAFANA_INTEGRATION.md](topology-manager/GRAFANA_INTEGRATION.md)** - Application integration details

## 🐳 Docker Commands

### Start Services
```bash
docker-compose -f docker-compose.grafana.yml up -d
```

### Stop Services
```bash
docker-compose -f docker-compose.grafana.yml down
```

### View Logs
```bash
# All services
docker-compose -f docker-compose.grafana.yml logs -f

# Grafana only
docker-compose -f docker-compose.grafana.yml logs -f grafana

# Prometheus only
docker-compose -f docker-compose.grafana.yml logs -f prometheus
```

### Restart Services
```bash
docker-compose -f docker-compose.grafana.yml restart
```

### Remove All Data (Fresh Start)
```bash
docker-compose -f docker-compose.grafana.yml down -v
```

### Check Running Containers
```bash
docker ps
```

Expected output should show:
- `netpulse-grafana` on port 3000
- `netpulse-prometheus` on port 9090

## 🎯 Features

### Grafana Integration

- ✅ **Embed Mode**: View Grafana dashboards within the application
- ✅ **External Mode**: Open Grafana in a new tab
- ✅ **Auto-Configuration**: Pre-configured Prometheus datasource
- ✅ **Sample Dashboard**: Network topology overview dashboard included
- ✅ **Persistent Settings**: Configuration saved to browser localStorage
- ✅ **Responsive Design**: Works on desktop and mobile

### Application Features

- Network topology visualization
- Device management and monitoring
- Path analysis and reachability testing
- Real-time performance monitoring
- Traffic analysis
- Configuration management
- And much more...

## 🔍 Troubleshooting

### Docker Daemon Not Running

**Error**: `Cannot connect to the Docker daemon`

**Solution**:
1. Open Docker Desktop application
2. Wait for it to fully start (green indicator)
3. Try the command again

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Find what's using the port
lsof -i :3000

# Kill the process or change the port in docker-compose.grafana.yml
```

### Grafana Not Loading in Iframe

**Issue**: Blank page in embed mode

**Solution**:
1. Try opening http://localhost:3000 directly in a browser
2. If that works, the iframe restrictions might be the issue
3. Use **Redirect Mode** in the application instead

### Cannot Access from Application

**Error**: Connection refused

**Solution**:
1. Verify Grafana is running: `docker ps | grep grafana`
2. Check URL is correct: `http://localhost:3000`
3. Ensure you're not using `https` if Grafana is on `http`

## 📚 Additional Resources

### Grafana

- **Official Docs**: https://grafana.com/docs/
- **Dashboard Marketplace**: https://grafana.com/grafana/dashboards/
- **Tutorials**: https://grafana.com/tutorials/

### Prometheus

- **Official Docs**: https://prometheus.io/docs/
- **Query Guide**: https://prometheus.io/docs/prometheus/latest/querying/basics/

### Docker

- **Docker Compose**: https://docs.docker.com/compose/
- **Docker Desktop**: https://docs.docker.com/desktop/

## 🛟 Getting Help

### Check Service Status
```bash
docker-compose -f docker-compose.grafana.yml ps
```

### View Service Logs
```bash
docker-compose -f docker-compose.grafana.yml logs --tail=100 grafana
```

### Test Service Connectivity
```bash
# Test Grafana
curl http://localhost:3000/api/health

# Test Prometheus
curl http://localhost:9090/-/healthy
```

## 🔐 Security Notes

The default setup is configured for **development use**. For production:

1. **Change default passwords**
2. **Enable HTTPS/SSL**
3. **Configure proper authentication** (OAuth, LDAP, etc.)
4. **Restrict network access**
5. **Use environment variables for secrets**
6. **Regular backups**

See [GRAFANA_SETUP.md](GRAFANA_SETUP.md) for production configuration details.

## 📝 Next Steps

1. ✅ Ensure Docker Desktop is running
2. ✅ Start Grafana and Prometheus with `./start-grafana.sh`
3. ✅ Access Grafana at http://localhost:3000
4. ✅ Start the main application
5. ✅ Configure Grafana in the app
6. 📊 Create custom dashboards
7. 🔔 Set up alerts
8. 📈 Monitor your network

## 💡 Tips

- **Create backups** before making major changes
- **Use dashboard templates** from Grafana marketplace
- **Set up alerts** for critical metrics
- **Document your custom configurations**
- **Keep Docker images updated**: `docker-compose pull`

---

Happy Monitoring! 🎉

For detailed setup instructions, see [GRAFANA_SETUP.md](GRAFANA_SETUP.md)


