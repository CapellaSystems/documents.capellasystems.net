import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'VOD Transcoding Products',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <p><strong>Cambria File Transcoder (FTC):</strong> A flexible and scalable transcoder built for integration and fine-tuned for efficiency. Cloud-native but equally functional on-prem or hybrid. The enterprise solution for industrial-strength transcoding.</p>
        <p><strong>Cambria Cluster:</strong> A scalable transcoding network of multiple Cambria FTC machines for processing large volumes of video files, managed by the Cambria Cluster Manager.</p>
        <p><strong>Cambria FTC Packager:</strong> Flexible and efficient VOD packager that imports various offline file formats and repackages them into multiple adaptive streaming formats including HLS, MPEG-Dash, and CMAF, with support for encryption and ad insertion.</p>
      </>
    ),
  },
  {
    title: 'Live Encoding On-Premise Products',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <p><strong>Cambria Live/Live Editor:</strong> Functions as a standalone, all-in-one live studio encoder or as part of a network of multiple Cambria Live workstations managed by Cambria Broadcast Manager.</p>
        <p><strong>Cambria Broadcast Manager (BCM):</strong> Manages multiple Cambria Live workstations for a fully automated live streaming workflow, handling ad insertion, scheduled live streaming, and more.</p>
      </>
    ),
  },
  {
    title: 'Live Encoding in the Cloud',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <p><strong>Cambria Stream/Stream Packager:</strong> A flexible and scalable live encoder and packager designed for cloud-based live streaming workflows. Easily deployable via Docker and scalable with Kubernetes.</p>
        <p><strong>Cambria Stream Manager (CSM):</strong> Features an easy-to-use web UI to oversee cloud-based networks of Cambria Stream Encoders and Packagers, with monitoring, alerts, notifications, and automated failover switching.</p>
        <p><strong>Flexibility:</strong> Highly customizable engine with a modern API for easy integration with existing systems. Compatible with various packagers, SSAI, DRM, and CDNs, making it easy to fit into complex media workflows.</p>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
