Run a security audit of the IdeaFlow codebase before committing.

Scan ALL TypeScript and JavaScript files for:
1. Hardcoded secrets: ANTHROPIC_API_KEY, JWT_SECRET, passwords, tokens, MongoDB URIs
2. Direct Anthropic API calls outside of backend/src/services/claude.ts
3. Missing authentication middleware on Express routes (check each route file)
4. Raw SQL/MongoDB queries that include unvalidated user input
5. console.log() statements containing request bodies, tokens, or user data
6. Missing zod validation on POST/PUT endpoints

Output format:
- CRITICAL: [file:line] — [description]
- WARNING:  [file:line] — [description]
- PASS: [check name]

If any CRITICAL findings: print "❌ DO NOT COMMIT — fix before proceeding"
If only WARNINGs: print "⚠️ Review before committing"
If all pass: print "✅ Security check passed"
