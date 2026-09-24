# Chat.Z.AI GitHub Transport Test

This is a transport test only.

Do not modify the product.
Do not begin product development.
Do not infer the file contents from this instruction.

Download the exact RAW GitHub URL provided to you with `curl`.

After download:

1. report HTTP status/final URL if available;
2. save the file to `/home/z/my-project/external-context/probe.txt`;
3. report byte size;
4. compute and report SHA-256;
5. print the exact full file contents;
6. read the saved file back from disk and prove it is identical.

Expected SHA-256:

`7ce8b83d28959b7d6c6bb7160b22360bf72068a1ca97b699286e483683342cac`

If the SHA does not match exactly, the test FAILS even if the text looks similar.

If the first attempt fails:
- make at most 3 materially different attempts;
- do not fabricate success;
- report the exact failure.

Final status must be exactly one of:

`TRANSPORT_PASS`

or

`TRANSPORT_FAIL`

Do not start any other work after this test.
