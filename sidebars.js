// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Cambria Stream Sidebar
  StreamSidebar: [
    {
      type: 'category',
      label: 'Installation Guides',
      items: [
        {
          type: 'category',
          label: 'Kubernetes',
          items: [
            {
              type: 'category',
              label: 'AWS',
              items: [
                'Cambria Stream/Installation Guides/Kubernetes/AWS/cambria_stream_aws_kubernetes/index',
                'Cambria Stream/Installation Guides/Kubernetes/AWS/linux_cambria_stream_5_4_0_guide/index',
              ],
            },
            {
              type: 'category',
              label: 'Akamai',
              items: [
                'Cambria Stream/Installation Guides/Kubernetes/Akamai/cambria_stream_akamai_kubernetes/index',
              ],
            },
            {
              type: 'category',
              label: 'Oracle',
              items: [
                'Cambria Stream/Installation Guides/Kubernetes/Oracle/placeholder',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'Cambria Stream/Installation Guides/Windows/placeholder',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Release Notes',
      items: [
        'Cambria Stream/Release Notes/cambria_stream_techspec/index',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'Cambria Stream/API/Introduction',
        'Cambria Stream/API/Event_Description',
        {
          type: 'category',
          label: 'API Methods',
          link: {
            type: 'doc',
            id: 'Cambria Stream/API/API_Methods',
          },
          items: [
            'Cambria Stream/API/methods/AddEvent',
            'Cambria Stream/API/methods/AddMachines',
            'Cambria Stream/API/methods/CheckEventSource',
            'Cambria Stream/API/methods/DeleteEvent',
            'Cambria Stream/API/methods/DeleteMachine',
            'Cambria Stream/API/methods/EmailTest',
            'Cambria Stream/API/methods/ExportEvents',
            'Cambria Stream/API/methods/GetEventHistory',
            'Cambria Stream/API/methods/GetEventInfo',
            'Cambria Stream/API/methods/GetEventInstancesList',
            'Cambria Stream/API/methods/GetEventPreview',
            'Cambria Stream/API/methods/GetEventsConflict',
            'Cambria Stream/API/methods/GetEventsList',
            'Cambria Stream/API/methods/GetMachineInfo',
            'Cambria Stream/API/methods/GetMachinesList',
            'Cambria Stream/API/methods/GetNotification',
            'Cambria Stream/API/methods/GetSettings',
            'Cambria Stream/API/methods/GetSwitchingLog',
            'Cambria Stream/API/methods/GetSystemInfo',
            'Cambria Stream/API/methods/GetSystemStatus',
            'Cambria Stream/API/methods/GetUnifiedLog',
            'Cambria Stream/API/methods/GetYouTubeThumbnail',
            'Cambria Stream/API/methods/ImportEvents',
            'Cambria Stream/API/methods/LiveControlAPI',
            'Cambria Stream/API/methods/SetEventInfo',
            'Cambria Stream/API/methods/SetMachineSettings',
            'Cambria Stream/API/methods/SetNotification',
            'Cambria Stream/API/methods/SetSettings',
            'Cambria Stream/API/methods/SetYouTubeThumbnail',
          ],
        },
        {
          type: 'category',
          label: 'Event Attributes',
          link: {
            type: 'doc',
            id: 'Cambria Stream/API/Event_Attributes',
          },
          items: [
            // Add the correct doc IDs for Cambria Stream event attributes here. If not available, add a placeholder.
            'Cambria Stream/API/event_attributes/Instance',
            'Cambria Stream/API/event_attributes/SettingData',
            'Cambria Stream/API/event_attributes/Slot',
            'Cambria Stream/API/event_attributes/TargetInfo',
            'Cambria Stream/API/event_attributes/YouTubeCategory',
            'Cambria Stream/API/event_attributes/YouTubeStreamFormat',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'Cambria Stream/Tutorials/Cambria_Stream_Primary_and_Backup/Cambria_Stream_Primary_and_Backup',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'Cambria Stream/FAQ/placeholder',
      ],
    },
  ],

  // Cambria FTC Sidebar
  FTCSidebar: [
    {
      type: 'category',
      label: 'Installation Guides',
      items: [
        {
          type: 'category',
          label: 'Kubernetes',
          items: [
            {
              type: 'category',
              label: 'AWS',
              items: [
                'Cambria_FTC/Installation Guides/Kubernetes/AWS/cambria-cluster-ftc-aws',
              ],
            },
            {
              type: 'category',
              label: 'Akamai',
              items: [
                'Cambria_FTC/Installation Guides/Kubernetes/Akamai/Akamai-Terraform_Kubernetes/cambria-cluster-ftc-terraform',
                'Cambria_FTC/Installation Guides/Kubernetes/Akamai/Akamai-Kubernetes/cambria-cluster-ftc-akamai',
              ],
            },
            {
              type: 'category',
              label: 'Oracle',
              items: [
                'Cambria_FTC/Installation Guides/Kubernetes/Oracle/cambria-cluster-ftc-oracle',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'Cambria_FTC/Installation Guides/Windows/placeholder',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Release Notes',
      items: [
        'Cambria_FTC/Release Notes/FTC v5.5 to v4.0',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'Cambria_FTC/API/placeholder',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'Cambria_FTC/Tutorials/Arib-std_b37_Captions_Extraction_and_Conversion/Arib-std_b37_Captions_Extraction_and_Conversion',
        'Cambria_FTC/Tutorials/Audio_Watermarking_Integration_with_Kantar_Guide',
        'Cambria_FTC/Tutorials/AMI_Creation_and_Editing/AMI_Creation_and_Editing',
        'Cambria_FTC/Tutorials/Speech-To-Text_Filter',
        'Cambria_FTC/Tutorials/Cluster_Redundancy_Feature',
        'Cambria_FTC/Tutorials/Color_Space_Coversion/Color_Space_Coversion',
        'Cambria_FTC/Tutorials/Delete_Source_after_Tanscoding/Delete_Source_after_Tanscoding',
        'Cambria_FTC/Tutorials/AVID_Interplay/AVID_Interplay',
        'Cambria_FTC/Tutorials/Trusted_Executables_and_Scripts',
        'Cambria_FTC/Tutorials/Harmonic_VOS_Upload_Guide/Harmonic_VOS_Upload_Guide',
        'Cambria_FTC/Tutorials/Logo_Filter/Logo_Filter',
        'Cambria_FTC/Tutorials/NexGuard_Filter/NexGuard_Filter',
        'Cambria_FTC/Tutorials/Database_Migration/Database_Migration',
        'Cambria_FTC/Tutorials/Scriptable_Workflow/Scriptable_Workflow',
        'Cambria_FTC/Tutorials/Subtitle_Burn-In_Workflow/Subtitle_Burn-In_Workflow',
        'Cambria_FTC/Tutorials/SCTE-35_Insertion',
        'Cambria_FTC/Tutorials/SNMP_Setup_and_Testing/SNMP_Setup_and_Testing',
        'Cambria_FTC/Tutorials/Using_the_Teletrax_Watermarking_Filter/Using_the_Teletrax_Watermarking_Filter',
        'Cambria_FTC/Tutorials/Video_Segments/Video_Segments',
        'Cambria_FTC/Tutorials/Carbon_Subtitle_XML_Workflow/Carbon_Subtitle_XML_Workflow'
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'Cambria_FTC/FAQ/placeholder',
      ],
    },
  ],
};

export default sidebars;
