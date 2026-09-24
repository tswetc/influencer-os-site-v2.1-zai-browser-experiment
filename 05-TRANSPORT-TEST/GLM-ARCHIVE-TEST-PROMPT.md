# ZIP Transport Test

Do not modify product files.

Download the commit-pinned ZIP:
https://raw.githubusercontent.com/tswetc/influencer-os-site-v2.1-zai-browser-experiment/89d826e80f19a39828701bb44d35fea2031f0f54/05-TRANSPORT-TEST/archive-probe.zip

Save as:
/home/z/my-project/external-context/archive-probe.zip

Expected:
- bytes: 280
- SHA-256: 29676ba445cf6d441faba77217e586586c7436d8fb113bd61900ace8a5b74afd

Verify:
1. HTTP 200
2. byte size
3. SHA-256
4. `unzip -t`
5. list exact archive contents
6. extract into a temporary directory
7. print exact text from both extracted files

Expected entries:
- README.txt
- nested/source.txt

Final line:
TRANSPORT_ARCHIVE_PASS
or
TRANSPORT_ARCHIVE_FAIL
