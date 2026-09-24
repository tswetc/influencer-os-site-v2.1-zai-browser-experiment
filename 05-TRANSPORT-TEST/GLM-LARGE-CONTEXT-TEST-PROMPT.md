# Chat.Z.AI Large Context Transport Test

This is transport test stage 2.

Do not modify the product.
Do not begin product development.
Do not infer file contents from this instruction.

Download the commit-pinned RAW file:

https://raw.githubusercontent.com/tswetc/influencer-os-site-v2.1-zai-browser-experiment/dbce492b212daff2adbcb248e83405db34e52b2c/05-TRANSPORT-TEST/large-context-455kb.md

Save it to:

/home/z/my-project/external-context/large-context-455kb.md

Expected byte size:

455038

Expected SHA-256:

f1b65035b784242495dc1328c427edddb31452ea0cccc68df6c897cd2d747596

Verify:
1. HTTP 200/final URL;
2. exact byte size;
3. exact SHA-256;
4. first 3 lines;
5. exact LINE_02500;
6. exact final line LINE_05000;
7. readback from disk;
8. byte-for-byte comparison against a second download if practical.

Do not print all 455 KB into chat.

If the SHA does not match exactly, the test FAILS.

Final line exactly:
TRANSPORT_LARGE_PASS
or
TRANSPORT_LARGE_FAIL
