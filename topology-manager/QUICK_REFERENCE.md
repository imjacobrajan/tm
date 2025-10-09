# Topology Manager - Quick Reference Guide

## 📋 Module Overview

| Module | Purpose | Key Features | Location |
|--------|---------|--------------|----------|
| **Discovery Wizard** | Network scanning & device discovery | Multi-step wizard, credential management, auto-expansion | `Discovery/DiscoveryWizard.tsx` |
| **Protocol Ingestion** | Topology discovery via protocols | LLDP, CDP, IS-IS, OSPF, BGP support | `Network/NetworkProtocolIngestion.tsx` |
| **Enhanced Network Map** | Interactive topology visualization | Multiple layouts, overlays, pan/zoom | `Network/EnhancedNetworkMap.tsx` |
| **Device List** | Tabular device view | Filtering, sorting, bulk operations | `Devices/DeviceList.tsx` |
| **Device Details** | Comprehensive device information | Interfaces, metrics, monitoring, config | `Devices/DeviceDetails.tsx` |
| **Path Analysis** | Network path calculation | L2/L3 paths, hop details, bottlenecks | `Analysis/PathAnalysis.tsx` |
| **Reachability Analysis** | Connectivity testing | Ping, traceroute, dependency-aware | `Analysis/ReachabilityAnalysis.tsx` |
| **Traffic Analysis** | NetFlow/sFlow analysis | Top talkers, applications, bandwidth | `Analysis/NetworkTrafficAnalysis.tsx` |
| **Performance Dashboard** | Real-time device monitoring | CPU, memory, bandwidth, graphs | `Monitoring/PerformanceDashboard.tsx` |
| **Wireless Monitor** | WiFi network monitoring | APs, clients, RF analytics | `Monitoring/WirelessNetworkMonitor.tsx` |
| **Application Monitor** | Business application monitoring | Response time, availability, SLA | `Monitoring/ApplicationPerformanceMonitor.tsx` |
| **Cloud Monitor** | Cloud resource monitoring | AWS/Azure/GCP, costs, metrics | `Monitoring/CloudResourcesMonitor.tsx` |
| **Log Management** | Centralized log collection | Syslog, parsing, search, alerts | `Monitoring/LogManagement.tsx` |
| **Map View** | Geographic device mapping | Interactive maps, site boundaries | `Maps/MapView.tsx` |
| **Geotagging Manager** | Location data management | Geocoding, bulk operations | `Maps/GeotaggingManager.tsx` |
| **Credentials Manager** | Authentication credentials | SNMP, SSH, cloud APIs, scoping | `Settings/CredentialsManager.tsx` |
| **Configuration Manager** | Config backup & compliance | Version control, policies, diff | `Settings/ConfigurationManager.tsx` |
| **Dashboard** | Central overview | Stats, charts, quick actions | `Dashboard/Dashboard.tsx` |

---

## 🔄 Common Workflows

### 1. Discover New Network
```
Dashboard → Discovery → New Scan → Configure Seeds → Select Credentials → Start Scan → View Results
```

### 2. View Topology
```
Dashboard → Network → Topology → Select Layout → Apply Overlays → Click Devices for Details
```

### 3. Troubleshoot Connectivity
```
Analysis → Reachability → Select Source/Destination → Run Test → View Results → Identify Failure Point
```

### 4. Find Path Between Devices
```
Analysis → Path Analysis → Select Endpoints → Calculate Paths → View Hop-by-Hop Details
```

### 5. Monitor Device Performance
```
Network → Devices → Select Device → View Details → Monitoring Tab → Performance Graphs
```

### 6. Discover Links Using Protocols
```
Analysis → Protocol Ingestion → Select Protocols → Configure Settings → Choose Device → Start Ingestion
```

---

## 🎯 Protocol Support Matrix

| Protocol | Layer | Purpose | Discovery Scope |
|----------|-------|---------|-----------------|
| **LLDP** | L2 | Neighbor discovery | Known network |
| **CDP** | L2 | Cisco neighbor discovery | Known network |
| **IS-IS** | L3 | Routing topology | Internal routing |
| **OSPF** | L3 | Routing topology | Internal routing |
| **BGP** | L3 | External routing | Beyond network (ISPs, peers) |
| **SNMP** | Management | Device info | Any SNMP-enabled device |
| **SSH/Telnet** | Management | CLI access | Any SSH/Telnet device |
| **WMI** | Management | Windows devices | Windows servers |
| **Cloud APIs** | Management | Cloud resources | AWS/Azure/GCP |

---

## 📊 Data Flow Summary

```
┌──────────────┐
│   Discovery  │ ──→ Finds devices via ping, SNMP, cloud APIs
└──────────────┘
       ↓
┌──────────────┐
│ Classification│ ──→ Assigns roles based on fingerprints
└──────────────┘
       ↓
┌──────────────┐
│   Protocol   │ ──→ Discovers links via LLDP/CDP/IS-IS/OSPF/BGP
│  Ingestion   │
└──────────────┘
       ↓
┌──────────────┐
│   Topology   │ ──→ Builds relationship graph
│   Builder    │
└──────────────┘
       ↓
┌──────────────┐
│Visualization │ ──→ Renders diagrams and maps
└──────────────┘
       ↓
┌──────────────┐
│  Monitoring  │ ──→ Tracks performance metrics
└──────────────┘
       ↓
┌──────────────┐
│   Analysis   │ ──→ Path/reachability/traffic analysis
└──────────────┘
```

---

## 🔧 Key Configuration Files

| File | Purpose |
|------|---------|
| `src/types/index.ts` | All TypeScript interfaces and types |
| `src/data/mockData.ts` | Mock data for development |
| `src/App.tsx` | Main application component & routing |
| `vite.config.ts` | Build configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.js` | Styling configuration |
| `package.json` | Dependencies and scripts |

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📝 Navigation Menu Structure

```
📊 Dashboard
🔍 Discovery
   ├─ New Scan
   └─ Scan History
🌐 Network
   ├─ Devices
   ├─ Topology
   └─ Geographic Maps
📈 Analysis
   ├─ Path Analysis
   ├─ Reachability
   ├─ Protocol Ingestion
   └─ Reports
📊 Monitoring
   ├─ Performance
   ├─ Traffic Analysis
   ├─ Wireless Networks
   ├─ Applications
   ├─ Cloud Resources
   └─ Logs
⚙️ Settings
   ├─ Credentials
   ├─ Device Roles
   ├─ Dependencies
   ├─ Schedules
   └─ Configuration Management
```

---

## 🎨 UI Components Hierarchy

```
App
├─ Layout
│  ├─ Header (logo, search, notifications, user menu)
│  ├─ Sidebar (navigation menu)
│  └─ Content Area
│     ├─ Dashboard (main overview)
│     ├─ Discovery Wizard (network scanning)
│     ├─ Network Views (devices, topology, maps)
│     ├─ Analysis Tools (path, reachability, traffic)
│     ├─ Monitoring Dashboards (performance, wireless, apps)
│     └─ Settings Panels (credentials, roles, config)
└─ Modals & Overlays
   ├─ Device Details
   ├─ Path Analysis
   ├─ Reachability Test
   └─ Map View
```

---

## 📐 Layout Types

| Layout | Use Case | Best For |
|--------|----------|----------|
| **Radial** | Equal importance devices | Small networks |
| **Hierarchical** | Core-Distribution-Access | Enterprise networks |
| **Force-Directed** | Automatic positioning | Complex meshes |
| **Geographic** | Physical locations | Multi-site networks |

---

## 🎯 Status Color Coding

| Color | Status | Meaning |
|-------|--------|---------|
| 🟢 Green | Up | Device healthy and reachable |
| 🔴 Red | Down | Device unreachable or failed |
| 🟡 Yellow | Warning | Degraded or threshold exceeded |
| ⚪ Gray | Unknown | Status cannot be determined |

---

## 🔐 Credential Types

| Type | Protocol | Use Case |
|------|----------|----------|
| **SNMP v1/v2c** | SNMP | Legacy device monitoring |
| **SNMP v3** | SNMP | Secure device monitoring |
| **SSH** | SSH | CLI access, config backup |
| **Telnet** | Telnet | Legacy CLI access |
| **WMI** | WMI | Windows server monitoring |
| **VMware** | vCenter API | Virtual infrastructure |
| **AWS** | AWS API | AWS cloud resources |
| **Azure** | Azure API | Azure cloud resources |
| **GCP** | GCP API | Google cloud resources |
| **Meraki** | REST API | Meraki devices |

---

## 📊 Monitoring Metrics

### Device Metrics
- CPU utilization (%)
- Memory usage (%, GB)
- Disk space (%, GB)
- Temperature (°C)
- Uptime

### Interface Metrics
- Bandwidth in/out (bps)
- Packet rate (pps)
- Error rate
- Discard rate
- Utilization (%)

### Application Metrics
- Response time (ms)
- Availability (%)
- Transaction rate
- Error rate

### Cloud Metrics
- CPU utilization
- Network I/O
- Hourly/monthly cost
- Request count

---

## 🔍 Search & Filter Options

### Device Filters
- Status (up/down/warning/unknown)
- Vendor (Cisco, Dell, HP, etc.)
- Device type (router, switch, firewall, etc.)
- Site/location
- OS type
- Date range

### Link Filters
- Discovery source (LLDP, CDP, OSPF, etc.)
- Link status (up/down)
- VLAN
- Confidence level

---

## 📦 Core Data Models

### Device
- Basic info (hostname, IP, vendor, model)
- Status
- Interfaces
- Roles
- Location
- Monitors
- Dependencies

### Interface
- Name
- MAC address
- Speed/duplex
- Admin/operational status
- VLAN
- LLDP/CDP info
- Links

### Link
- Source/target devices
- Source/target interfaces
- Discovery protocol
- Confidence
- Status
- Speed

### Site
- Name
- Location
- Devices
- Subnets
- VLANs

---

## 🛠️ Troubleshooting Checklist

### Device Not Discovered
- ✅ Check IP reachability (ping)
- ✅ Verify credentials
- ✅ Confirm SNMP/SSH enabled on device
- ✅ Check firewall rules
- ✅ Validate credential scoping

### Links Not Showing
- ✅ Verify LLDP/CDP enabled on devices
- ✅ Check protocol ingestion results
- ✅ Confirm interfaces are up
- ✅ Review link confidence threshold

### Monitoring Not Working
- ✅ Check device role assignment
- ✅ Verify monitoring template applied
- ✅ Confirm credentials valid
- ✅ Check polling interval settings

### Path Analysis Fails
- ✅ Verify both devices exist in topology
- ✅ Check link status between devices
- ✅ Confirm routing information available
- ✅ Review path calculation options

---

## 📚 Documentation Links

- **Full Datasheet**: `TOPOLOGY_MANAGER_DATASHEET.md`
- **Protocol Ingestion**: `explorer/12-network-protocol-ingestion.md`
- **Discovery Flow**: `explorer/01-network-discovery-flow.md`
- **Topology Visualization**: `explorer/07-topology-visualization.md`
- **Path Analysis**: `explorer/10-path-analysis.md`
- **All Flows**: `explorer/README.md`

---

## 💡 Pro Tips

1. **Start Simple**: Begin with LLDP/CDP discovery before adding routing protocols
2. **Use Scoping**: Configure credential scoping to improve discovery speed
3. **Enable Auto-Monitoring**: Let device roles automatically configure monitoring
4. **Geographic Maps**: Geotag devices early for better visualization
5. **Regular Backups**: Schedule configuration backups to track changes
6. **Bulk Operations**: Use bulk ingestion for large network updates
7. **Filter Early**: Apply filters before running analysis to improve performance

---

## 🆘 Support Resources

- **Issue Tracker**: (GitHub Issues URL)
- **Documentation**: `/explorer/` directory
- **API Reference**: (API documentation URL)
- **Community Forum**: (Forum URL)
- **Email Support**: (Support email)

---

**Quick Reference Version**: 1.0.0  
**Last Updated**: 2025  
**For detailed information, see**: `TOPOLOGY_MANAGER_DATASHEET.md`

