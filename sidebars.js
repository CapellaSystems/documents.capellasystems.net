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
        'Cambria Stream/Tutorials/cambria_stream_primary_backup/index',
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
                'Cambria FTC/Installation Guides/Kubernetes/AWS/cambria-cluster-ftc-aws',
              ],
            },
            {
              type: 'category',
              label: 'Akamai',
              items: [
                'Cambria FTC/Installation Guides/Kubernetes/Akamai/Akamai-Terraform_Kubernetes/cambria-cluster-ftc-terraform',
                'Cambria FTC/Installation Guides/Kubernetes/Akamai/Akamai-Kubernetes/cambria-cluster-ftc-akamai',
              ],
            },
            {
              type: 'category',
              label: 'Oracle',
              items: [
                'Cambria FTC/Installation Guides/Kubernetes/Oracle/cambria-cluster-ftc-oracle',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'Cambria FTC/Installation Guides/Windows/placeholder',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Release Notes',
      items: [
        'Cambria FTC/Release Notes/FTC v5.5 to v4.0',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'Cambria FTC/API/placeholder',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'Cambria FTC/Tutorials/Arib-stdb37/index',
        'Cambria FTC/Tutorials/Audio_watermarking_integration_with_Kantar_guide',
        'Cambria FTC/Tutorials/aws_ami_creation_editing/index',
        'Cambria FTC/Tutorials/cambria-ftc-stt',
        'Cambria FTC/Tutorials/cluster_redundancy',
        'Cambria FTC/Tutorials/Color_Space_Coversion/color-space-conversion',
        'Cambria FTC/Tutorials/delete_source/index',
        'Cambria FTC/Tutorials/FTC_Avid_Ingest_Guide/index',
        'Cambria FTC/Tutorials/ftc-and-cluster-trusted-executables',
        'Cambria FTC/Tutorials/Harmonic_VOS_Upload_Guide/harmonic-vos-upload-guide',
        'Cambria FTC/Tutorials/Logo_filter/logo-filter',
        'Cambria FTC/Tutorials/NexGuardFTC_filter/nexguard-ftc-guide',
        'Cambria FTC/Tutorials/postgres_migration/database-migration',
        'Cambria FTC/Tutorials/scriptable_workflow/scriptable-workflow',
        'Cambria FTC/Tutorials/Subtitle_Burn-In/subtitle-burnin',
        'Cambria FTC/Tutorials/scte-35_insertion',
        'Cambria FTC/Tutorials/Snmp_Setup_and_testing/snmp-guide',
        'Cambria FTC/Tutorials/Using_the_Teletrax_Watermarking_Filter/teletrax-watermarking',
        'Cambria FTC/Tutorials/Video_Segments/video-segments',
        'Cambria FTC/Tutorials/XML_Titler_with_Carbon_Subtitle_Workflow/carbon-subtitle-xml'
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'Cambria FTC/FAQ/placeholder',
      ],
    },
  ],
};

export default sidebars;
