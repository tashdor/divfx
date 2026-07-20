# Visual Effects Production Management

While the VFX supervisor is largely responsible for overseeing the artistic direction of visual
effects work, the VFX producer and the VFX production managers (producers, coordinators, etc.)
are also responsible for management of the visual effects production process.

Production management is broadly the scheduling, asset management, progress tracking, and
team management operation behind visual effects production. On large films with thousands of
shots it requires a small army of coordinators to assist the VFX producer.

On large, effects-heavy projects the individual artist management is delegated to the various
visual effects studios hired by the production. The VFX producer is responsible for delegating
and coordinating with those studios rather than with the individual artists.

On a smaller production where there is no visual effects studio, but rather a collection of artists
working locally or virtually (typically from their home studios by way of cloud-based file
sharing), it becomes necessary for the acting VFX supervisor to facilitate the production
management.

## Asset Management

Asset management is the process of identifying visual effects shots, assigning shot names,
ordering and processing plate pulls, organizing shots, and distributing relevant media and
metadata to vendors and artists.

Small productions without studio-level resources commonly rely on off-the-shelf products to
facilitate asset management, weighing cost and feature set as their main purchasing
considerations. High-end commercial file transmission favorites of studios, such as Aspera
Faspex, Signiant Media Shuttle, and Sohonet FileRunner, are usually outside the budgets of
small productions. Instead, small productions and virtual studios regularly employ systems like
Dropbox, Google Drive, and Hightail to privately distribute visual effects assets in the cloud.
These present a number of advantages and disadvantages compared to purpose-built media
delivery platforms.

Cloud hosted solutions like Dropbox and Google Drive are attractive because the redistribution
of media to multiple artists does not require redundant transmissions and uploads per delivery;
rather a single upload to Dropbox and sharing as needed to artists without additional overhead
to the uploader. This is an important consideration for productions without access to
commercial-grade internet service, especially in today's world of 4K+ acquisition and 4K
delivery.

Dropbox Business enables granular permissions, allowing production managers to selectively
provide artists access to individual plate and render directories on an as-needed basis without
granting total access to the production's Dropbox. This provides for higher security and
managed control of assets leaving the production. Additionally, Dropbox Business allows for
unlimited file recovery and version history, so if a file is deleted or overwritten it can easily be
restored without significant downtime or re-uploading from an archive.

Google Drive offers similar flexibility to Dropbox, but with fewer business-oriented solutions.

Many cloud-based file sharing systems include preview and review tools. While visual effects
shots are in the creative production phase, a remote artist will upload QuickTime previews to
the production's cloud service and the VFX supervisor, director, editor, and other creative
executives can review directly in the service's web interface or mobile app and leave creative
feedback and notes. This provides for a very fast exchange and review process, often
eliminating the need for download and ingest of preview files into a dedicated preview system
until it is necessary to perform critical inspection of shots that are presented as potential final
versions.

Services like Frame.io and Wipster.io are great solutions for more detailed
review of video previews with expanded support for timecode-accurate annotations and export
of notes to external formats. Both support similar integration with Adobe Premiere and
After Effects.

!!! warning "Out of date"
    Ownership and product names across this section have changed substantially. Notably,
    Frame.io is now an Adobe product, and Wipster was never a Vimeo product as stated in the
    original edition. See [Notes for v1.1](v1.1-notes.md#review-and-delivery-platforms).

In addition to uploading renders, artists may also exchange working project files and shared
assets via the production's cloud service. This can be useful in collaborations between multiple
artists that are not co-located, last minute fixes and tweaks if an artist is unavailable, and
facilitating distributed rendering of final shots.

While cloud-based sharing systems such as Dropbox are great for collaborative production
work, they are not generally preferable for fast, direct transmission of files to a post house or
digital intermediate facility. Syncing large files with Dropbox requires using its native app,
complicating a direct download process by requiring more setup and configuration on the part
of the recipient. For facilities receiving files from multiple clients, it is not practical for them to
be logged in to Dropbox accounts on multiple data I/O systems, downloading files from multiple
sources. It is a lot more efficient for them to simply receive a direct, secure download link of
just the files they need at that time. If those files are to be iterated or revised at a later date,
those new versions will simply be sent again. Many facilities are under strict studio-mandated
security policies that do not allow for cloud-based transmission from systems like Dropbox.

Instead, direct download links via Aspera or Signiant are preferred. In situations where client
content is not under restricted delivery protocols, Hightail or WeTransfer transmission are
preferable for one-time direct transmission of files on lower production budgets.

Many large post-production facilities have their own Aspera or Signiant servers and, if
necessary, can provide credentials for direct point-to-point transmission to and from clients,
providing even more security by bypassing a central server (like Hightail) outside their network.

For large deliveries, it is sometimes faster to copy large files to a physical drive and send it
across town the old fashioned way via courier or production assistant. Overnight shipping
through UPS and FedEx can even be faster than transferring large files over the internet.

## Production Tracking

Once material has been delivered to artists, the visual effects production managers are
responsible for maintaining a watchful eye on the progress of those shots and keeping the
production on schedule. This involves tracking milestones of artist iteration, creative review,
notes, and final approval. CGI shots will go through multiple phases of production, from layout,
to animation, to lighting, and finally to compositing. When managing the production of
hundreds, or thousands, of shots in their various states of progress, it is important for
production managers to maintain an accurate database of each shot's status, assets, history,
and assigned resources and artists.

Tools like **Autodesk Flow Production Tracking** — formerly Shotgun, then ShotGrid, and now part
of Autodesk Flow — and **ftrack** (acquired by Backlight in 2022) are industry-specific tools for
coordinating visual effects projects. They have key features for asset tracking, deadlines,
budgets, shot review, annotation, and client feedback, and serve as central collaborative
workspaces that production managers and artists alike can leverage to define and maintain their goals.

These tools are especially appealing to large visual effects studios because of their APIs that
allow software engineers and technical directors to integrate the management system directly
into their automated pipeline. While heavily customizable, they are also now designed to be
accessible and friendly to small productions and studios right out of the box, with software
tie-ins to common applications like Flame, Nuke, Maya, Cinema 4D, Adobe Premiere, and more.

Many productions elect to build their own shot and resource tracking databases, often using
off-the-shelf tools like FileMaker, Microsoft Excel, or Google Sheets. Depending on the size of
the production, the number and complexity of shots, and the number of artists and managers
involved, these solutions may be the simplest and most cost effective.

These databases include relevant shot information such as shot name, plate(s), original source
metadata, shot description, VFX description, notes, production status, assigned artist/vendor,
latest version number, approval/review status, and version currently in the DI edit.

Ultimately this database is what the VFX editor and the conform editor reconcile their cuts
against to make sure the right shots end up in the final cut of the film. On small projects with
many jobs being undertaken by a smaller number of people, a flexible and organized approach
to production management is absolutely essential to save time and help prevent mistakes.

During the VFX production process, the visual effects production managers are responsible for
coordinating with production editorial, often via the VFX editor, and with the digital
intermediate, sending relevant files to each party during different phases of approval. When a
shot is ready to be reviewed by the filmmakers, an editorial preview version (QuickTime) is sent
to the VFX editor and cut into the offline edit. The director, editor, and relevant producers
make creative notes and order additional work to be done on the shot.

During the later stages of VFX production, the VFX supervisor, director, and other filmmakers
will conduct visual effects review sessions in which they review the proposed final shots and
close-to-finished shots on a theater screen. These reviews often include the director for final
creative approval. This service is often provided by the digital intermediate vendor or may be
provided by another company if convenient. It is important to review the proposed finals in a
color accurate theater environment in order to get a sense for how an audience will view the
shots. Many visual effects reviews are conducted using a color grading system to ensure
real-time playback at theatrical resolutions and to provide options for applying CDLs, Show LUTs,
and additional color corrections requested on the fly by the filmmakers.

If the shot is creatively approved, it will be deemed final and the VFX vendor is asked to deliver
a final version to DI pending any technical fixes on their end.

It is very common on large visual effects films to deliver multiple versions of VFX shots to the DI.
It is important to provide works in progress (WIPs) to the colorist early enough that they can
provide feedback and the filmmakers can see the WIPs with temp color grading in context with
the rest of the DI. However, this can be expensive as each redundant VFX shot costs data I/O,
editorial, and color grading time.

On lower budget productions, a lot of overhead can be saved if the visual effects are delivered
to the DI all at once and in a completed, finalized form, rather than as evolving versions.

After the initial conform, production editorial will follow up with change cuts and/or VFX
inserts, providing edit lists of the changes and new shots. Editorial must specify the exact
version number of a shot they are cutting in (using the offline QuickTime's clip name) so that
the DI has clear instructions that cannot be misinterpreted. It is never appropriate to rely on
the DI to guess which version is considered final, as the highest version of a shot is not always
the version approved by the filmmakers.

## Team Management

Independent productions often involve the formation of a virtual visual effects studio: a
collection of freelance artists working remotely, usually from their homes. There are factors to
consider when hiring for a virtual studio that don't always apply in a large, localized VFX studio
where everyone is working under the same roof.

In large studio environments there is compartmentalization of responsibilities between artists
and specialists, particularly in CGI. Junior artists are often responsible for tracking, roto, and
cleanup jobs, while senior artists are relied on for look development and final compositing. In
those environments, it is common for multiple artists to work on a single shot, employing their
various, specialized talents.

In distributed virtual shops, managers rely on a team of multi-talented generalists who are
often able to work in a number of different software systems and have a diverse skillset in CGI
or compositing, allowing them to complete an assigned shot on their own. In virtual shops it is
less common to have junior artists to perform roto and tracking tasks. The generalists that are
hired are often senior-level artists capable of doing their own assistive tasks.

Because there isn't a localized support staff in a virtual production environment, artists are
trusted to work without much revision or supervision and trusted to deliver quality results with
minimal QC rejections.

!!! example "Anecdotally"
    Senior-level artists hailing from big visual effects studios are not necessarily experts on
    visual effects imaging pipeline, as that is largely the responsibility of the technical directors at
    their studio. In big studios artists are often insulated from the technical workflow
    considerations so that they can concentrate on their work rather than the mechanisms
    behind the workflow. Even senior-level artists require direction as far as workflow, color
    management, pipeline, file naming conventions, etc. That will be the responsibility of the
    visual effects production managers, often the VFX supervisor or lead artist on a small project.
