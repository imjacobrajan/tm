# Network Discovery Flow

## 🎯 Overview

The Network Discovery Flow is the foundation of the topology manager. It's like a **digital cartographer** that explores your network territory, mapping every device, connection, and pathway.

## 🏢 Real-World Analogy

Imagine you're a **city planner** tasked with creating a complete map of a new city:

1. **Starting Point**: You begin at a known landmark (seed device)
2. **Exploration**: You walk down every street (network path) 
3. **Documentation**: You record every building (device) you find
4. **Mapping**: You draw connections between buildings (network links)
5. **Classification**: You categorize buildings by type (device roles)
6. **Final Map**: You create a comprehensive city map (topology diagram)

## 📋 Step-by-Step Process

### Step 1: Basic Information Setup
**What happens**: User provides scan name and description
**Analogy**: Naming your exploration project ("Downtown Survey 2024")

**Inputs Required**:
- Scan name (required)
- Description (optional)

**Validation**: 
- Scan name must be provided
- Next button enables when name is entered

### Step 2: Seed Device Configuration
**What happens**: Define starting points for network exploration
**Analogy**: Choosing which city blocks to start your survey from

**Seed Device Types**:
- **Single IP**: `192.168.1.1` (specific building address)
- **IP Range**: `192.168.1.1-192.168.1.100` (street block)
- **Subnet**: `192.168.1.0/24` (entire neighborhood)
- **Cloud Provider**: AWS/Azure regions (different city districts)
- **Virtual**: VMware/Hyper-V hosts (apartment complexes)
- **Wireless**: Access points (mobile structures)
- **Storage**: SAN/NAS devices (warehouses)

**Configuration Options**:
- Device type selection
- IP address or range
- Description for identification
- Active/inactive status

### Step 3: Expansion Settings
**What happens**: Configure how far and wide to explore
**Analogy**: Deciding how many blocks away from your starting point to survey

**Expansion Parameters**:
- **Max Hops**: How many network "jumps" to make (like city blocks)
- **Max Devices**: Maximum number of devices to discover (building limit)
- **Include Virtual**: Include virtualized infrastructure
- **Include Cloud**: Include cloud-based resources
- **Include Wireless**: Include wireless access points
- **Include Storage**: Include storage systems

**Example**: 
- Max Hops: 3 = Explore 3 network segments away
- Max Devices: 100 = Stop after finding 100 devices

### Step 4: Credential Management
**What happens**: Provide authentication methods for device access
**Analogy**: Having the right keys or permissions to enter different buildings

**Credential Types**:
- **SNMP v1/v2c**: Community strings (simple door codes)
- **SNMP v3**: Username/password with encryption (secure keycards)
- **SSH**: Secure shell access (security guard verification)
- **WMI**: Windows Management (building manager credentials)
- **Cloud APIs**: AWS/Azure tokens (city hall permits)

**Priority System**:
- Credentials are tried in order of priority
- Higher priority = tried first
- Successful credentials are remembered for future scans

### Step 5: Advanced Options
**What happens**: Configure scan behavior and automation
**Analogy**: Setting up your survey equipment and automation

**Scan Options**:
- **Timeout**: How long to wait for device response (patience level)
- **Retries**: How many times to retry failed connections (persistence)
- **Parallel Scans**: How many devices to scan simultaneously (team size)
- **Auto-monitoring**: Automatically set up monitoring for discovered devices

**Exclusion Filters**:
- Skip certain IP ranges (restricted areas)
- Skip specific device types (private buildings)
- Skip certain vendors (government facilities)

### Step 6: Review & Execute
**What happens**: Final review and scan execution
**Analogy**: Double-checking your survey plan before starting

**Review Summary**:
- Scan name and description
- Number of seed devices
- Expansion settings
- Credentials to use
- Advanced options

**Execution Process**:
1. **Ping Sweep**: Find live IP addresses (identify occupied buildings)
2. **Port Scanning**: Identify open services (check building entrances)
3. **Protocol Probing**: Try SNMP, SSH, WMI (test different access methods)
4. **Device Classification**: Identify device types and roles (categorize buildings)
5. **Link Discovery**: Find connections between devices (map roads between buildings)
6. **Data Collection**: Gather device details (record building information)

## 🔄 Data Flow

```
User Input → Validation → Seed Expansion → Credential Testing → Device Discovery → Link Discovery → Classification → Results
```

## 📊 Discovery Results

**What's Generated**:
- **Device Inventory**: List of all discovered devices
- **Network Links**: Connections between devices
- **Device Roles**: Automatic classification
- **Credential Bindings**: Which credentials work for which devices
- **Error Logs**: Failed discovery attempts
- **Summary Statistics**: Discovery metrics and performance

**Example Results**:
```json
{
  "totalDevices": 25,
  "newDevices": 18,
  "updatedDevices": 7,
  "failedDevices": 2,
  "topVendors": [
    {"vendor": "Cisco", "count": 15},
    {"vendor": "Dell", "count": 8},
    {"vendor": "HP", "count": 2}
  ],
  "scanDuration": 180,
  "devicesPerSecond": 0.14
}
```

## 🎯 Post-Discovery Actions

**Automatic Actions**:
1. **Navigate to Topology**: Show discovered network diagram
2. **Update Device List**: Refresh device inventory
3. **Set Up Monitoring**: Configure health checks for new devices
4. **Generate Report**: Create discovery summary report

**Manual Actions Available**:
- View detailed device information
- Configure device roles and monitoring
- Set up dependencies and relationships
- Export discovery results

## 🔧 Technical Implementation

**Components Involved**:
- `DiscoveryWizard.tsx`: Multi-step configuration interface
- `DiscoveryScan` type: Data structure for scan configuration
- `Device` type: Discovered device information
- `Link` type: Network connection data
- `Credential` type: Authentication information

**Key Functions**:
- `startScan()`: Initiates the discovery process
- `handleDiscoveryComplete()`: Processes scan results
- `updateSeedDevice()`: Manages seed device configuration
- `toggleCredential()`: Handles credential selection

## 🚨 Common Issues & Solutions

**Issue**: No devices discovered
**Solution**: Check seed devices, credentials, and network connectivity

**Issue**: Partial discovery
**Solution**: Verify credential permissions and network segmentation

**Issue**: Slow discovery
**Solution**: Adjust timeout values and parallel scan limits

**Issue**: Credential failures
**Solution**: Verify credentials and check device SNMP/SSH configuration

## 📈 Best Practices

1. **Start Small**: Begin with a single IP or small subnet
2. **Use Multiple Credentials**: Have backup authentication methods
3. **Set Reasonable Limits**: Don't set max devices too high initially
4. **Monitor Progress**: Watch for errors and adjust settings
5. **Document Results**: Keep track of successful discovery patterns
6. **Regular Scans**: Schedule periodic discovery to catch new devices
